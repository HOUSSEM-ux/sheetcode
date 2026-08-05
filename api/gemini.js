/**
 * /api/gemini.js — Vercel Serverless Function
 *
 * Secure backend proxy for Google Gemini.
 * The API key is read exclusively from the server-side environment variable
 * GEMINI_API_KEY — it is never exposed to the browser.
 *
 * Accepted POST body (application/json):
 *   {
 *     type:     "vision",          // only supported type
 *     base64:   "<base64 string>", // raw base64, no data-URL prefix
 *     mimeType: "image/jpeg",      // must be a Google-supported image MIME
 *     userName: "Ahmed",           // injected into the persona prompt
 *   }
 *
 * Response (application/json):
 *   { text: "<raw model output>" }         — on success
 *   { error: "<message>", detail: {...} }  — on failure (full Google body included)
 */

// Raise body-parser limit for base64-encoded image payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// ── Gemini REST endpoint ────────────────────────────────────────────────────
// Using the stable v1 API + gemini-2.0-flash (current recommended fast model).
// gemini-1.5-flash and gemini-1.5-flash-latest are both deprecated on v1beta.
const GEMINI_MODEL    = 'gemini-2.0-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

// Supported MIME types for inline image data
const ALLOWED_MIMES = new Set([
  'image/jpeg', 'image/jpg', 'image/png',
  'image/webp', 'image/gif', 'image/heic', 'image/heif',
]);

export default async function handler(req, res) {
  // ── CORS ─────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // ── API KEY ───────────────────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[gemini] CRITICAL: GEMINI_API_KEY env var is not set on this Vercel deployment.');
    return res.status(500).json({
      error: 'Serveur non configuré — clé API manquante. Contactez +216 20 575 186.',
    });
  }

  // ── PARSE & VALIDATE REQUEST ──────────────────────────────────────────────
  const { type, base64, mimeType, userName } = req.body || {};

  if (type !== 'vision') {
    return res.status(400).json({ error: `Type inconnu: "${type}". Utilise "vision".` });
  }
  if (!base64) {
    return res.status(400).json({ error: 'Champ "base64" manquant dans le corps de la requête.' });
  }
  if (!mimeType) {
    return res.status(400).json({ error: 'Champ "mimeType" manquant dans le corps de la requête.' });
  }

  // Normalise mime — browsers sometimes send "image/jpg"
  const normMime = mimeType === 'image/jpg' ? 'image/jpeg' : mimeType;
  if (!ALLOWED_MIMES.has(normMime)) {
    return res.status(400).json({
      error: `Type de fichier non supporté: "${mimeType}". Utilise JPG, PNG, WebP ou GIF.`,
    });
  }

  // Strip data-URL prefix if the frontend accidentally included it
  const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;

  // ── PROMPT ────────────────────────────────────────────────────────────────
  const studentName = (userName || "l'étudiant").trim().slice(0, 64);

  const prompt = `Tu es un assistant pédagogique expert pour le Baccalauréat Tunisien 2027.
L'étudiant s'appelle ${studentName}.

Voici une image d'une page de cahier manuscrit de ${studentName}.

TÂCHE 1: Extrais intégralement le texte manuscrit visible en préservant la structure (titres, sous-titres, formules, listes).

TÂCHE 2: En te basant UNIQUEMENT sur le texte extrait, génère exactement 5 questions pédagogiques dans le style de "Rami" — un camarade tunisien perdu qui parle en code-switching naturel (Derja tunisien + termes scientifiques français + slang anglais type "bro", "wallah", "c'est quoi ça exactement ?"). Les questions doivent cibler les concepts clés et les pièges classiques du Bac.

FORMAT DE RÉPONSE OBLIGATOIRE (commence directement, sans texte avant):
TEXTE_EXTRAIT:
[texte extrait ligne par ligne]

QUESTIONS:
Q1: [question 1 en Derja code-switching]
Q2: [question 2]
Q3: [question 3]
Q4: [question 4]
Q5: [question 5]`;

  // ── CALL GEMINI ───────────────────────────────────────────────────────────
  const requestBody = {
    contents: [{
      parts: [
        { text: prompt },
        { inline_data: { mime_type: normMime, data: cleanBase64 } },
      ],
    }],
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 1600,
    },
  };

  console.log(`[gemini] Calling ${GEMINI_MODEL} for user="${studentName}", mime=${normMime}, base64len=${cleanBase64.length}`);

  let geminiRes;
  try {
    geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  } catch (networkErr) {
    console.error('[gemini] Network error reaching Google:', networkErr.message);
    return res.status(502).json({
      error: 'Impossible de joindre l\'API Google. Réessaie dans quelques secondes.',
      detail: { networkError: networkErr.message },
    });
  }

  // ── HANDLE GOOGLE ERROR — return FULL body so we can diagnose ─────────────
  if (!geminiRes.ok) {
    let errBody = {};
    try { errBody = await geminiRes.json(); } catch (_) {}
    const httpStatus = geminiRes.status;
    const googleMsg  = errBody?.error?.message || `HTTP ${httpStatus}`;
    console.error(`[gemini] Google rejected request — HTTP ${httpStatus}:`, JSON.stringify(errBody));
    return res.status(httpStatus).json({
      error:  `Erreur Google API (${httpStatus}): ${googleMsg}`,
      detail: errBody,                   // ← full Google error object for debugging
    });
  }

  // ── PARSE SUCCESS RESPONSE ────────────────────────────────────────────────
  let data;
  try { data = await geminiRes.json(); } catch (parseErr) {
    console.error('[gemini] Failed to parse Gemini JSON response:', parseErr.message);
    return res.status(502).json({ error: 'Réponse invalide reçue de Google.' });
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  if (!text) {
    console.warn('[gemini] Empty text in Gemini response:', JSON.stringify(data));
    return res.status(200).json({
      text: '',
      warning: 'Gemini a retourné une réponse vide. Essaie avec une image plus nette.',
    });
  }

  console.log(`[gemini] Success — response length: ${text.length} chars`);
  return res.status(200).json({ text });
}
