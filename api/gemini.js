/**
 * /api/gemini.js — Vercel Serverless Function
 *
 * Secure backend proxy for Google Gemini 1.5 Flash.
 * The API key is read exclusively from the server-side environment variable
 * GEMINI_API_KEY — it is never exposed to the browser.
 *
 * Accepted POST body (application/json):
 *   {
 *     type:     "vision",          // only supported type for now
 *     base64:   "<base64 string>", // image or PDF-page rendered as JPEG
 *     mimeType: "image/jpeg",
 *     userName: "Ahmed",           // injected into the persona prompt
 *   }
 *
 * Response (application/json):
 *   { text: "<raw model output>" }   — on success
 *   { error: "<message>" }           — on failure
 */

// Increase body-parser limit for base64-encoded image payloads (up to 8 MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default async function handler(req, res) {
  // ── CORS ─────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // ── API KEY (server-side only) ────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[SheetCode/api/gemini] GEMINI_API_KEY environment variable is not set.');
    return res.status(500).json({
      error: 'Le serveur n\'est pas configuré. Contactez le développeur : +216 20 575 186',
    });
  }

  // ── PARSE REQUEST ─────────────────────────────────────────────────────────
  const { type, base64, mimeType, userName } = req.body || {};

  if (type !== 'vision') {
    return res.status(400).json({ error: `Type de requête inconnu: "${type}". Seul "vision" est supporté.` });
  }

  if (!base64 || !mimeType) {
    return res.status(400).json({ error: 'Les champs base64 et mimeType sont obligatoires.' });
  }

  // ── BUILD PROMPT ──────────────────────────────────────────────────────────
  const studentName = (userName || 'l\'étudiant').trim();

  const prompt = `Tu es un assistant pédagogique expert pour le Baccalauréat Tunisien 2027.
L'étudiant s'appelle ${studentName}.

Voici une image d'une page de cahier manuscrit de ${studentName}.

TÂCHE 1: Extrais intégralement le texte manuscrit visible sur cette image en préservant la structure (titres, sous-titres, formules, listes).

TÂCHE 2: En te basant UNIQUEMENT sur le texte extrait, génère exactement 5 questions pédagogiques dans le style de "Rami" — un camarade tunisien perdu qui parle en code-switching naturel (Derja tunisien + termes scientifiques français + slang anglais type "bro", "wallah", "c'est quoi ça"). Les questions doivent cibler les concepts clés et les pièges classiques du Bac.

FORMAT DE RÉPONSE OBLIGATOIRE (respecte exactement cette structure, sans rien ajouter avant):
TEXTE_EXTRAIT:
[texte extrait ligne par ligne]

QUESTIONS:
Q1: [question 1 en Derja code-switching]
Q2: [question 2]
Q3: [question 3]
Q4: [question 4]
Q5: [question 5]`;

  // ── CALL GEMINI ───────────────────────────────────────────────────────────
  let geminiRes;
  try {
    geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: base64 } },
          ],
        }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 1400,
        },
      }),
    });
  } catch (networkErr) {
    console.error('[SheetCode/api/gemini] Network error reaching Gemini:', networkErr.message);
    return res.status(502).json({ error: 'Impossible de joindre l\'API Gemini. Réessaie dans quelques secondes.' });
  }

  if (!geminiRes.ok) {
    let errBody;
    try { errBody = await geminiRes.json(); } catch (_) { errBody = {}; }
    const msg = errBody?.error?.message || `Gemini HTTP ${geminiRes.status}`;
    console.error('[SheetCode/api/gemini] Gemini error:', msg);
    return res.status(geminiRes.status).json({ error: msg });
  }

  const data = await geminiRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  return res.status(200).json({ text });
}
