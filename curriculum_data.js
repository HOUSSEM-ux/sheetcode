/**
 * curriculum_data.js
 * SheetCode — Companion data structure for the Feynman Technique Bac App.
 * Maps the Tunisian Baccalaureate curriculum to official barème rules,
 * common exam traps, and Feynman prompts written in Tunisian code-switching.
 *
 * Source: temporary/curriculum_outlines.md, temporary/common_exam_traps.md,
 *         temporary/official_grading_criteria.md (Phase 1 cached data).
 */

const BAC_CURRICULUM = {

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS
  // ─────────────────────────────────────────────────────────────
  maths: {
    label: "Mathématiques",
    emoji: "📐",
    color: "#00ff94",
    subtopics: {

      complexNumbers: {
        label: "Nombres Complexes",
        emoji: "🌀",
        bareme_notes: [
          "Justifier la forme algébrique avant toute conversion.",
          "L'argument est défini modulo 2π — perdre ce détail = zéro sur la question géométrique.",
          "Les applications géométriques (rotation, translation) nécessitent une justification par le module ET l'argument.",
        ],
        traps: [
          {
            id: "cx_trap_1",
            description: "Confusing algebraic and exponential forms mid-calculation.",
            french: "Mélanger la forme algébrique (a+ib) et la forme exponentielle (re^(iθ)) dans le même calcul sans conversion explicite.",
          },
          {
            id: "cx_trap_2",
            description: "Forgetting argument is modulo 2π.",
            french: "Oublier que l'argument est défini modulo 2π, ce qui fausse l'interprétation géométrique (angle de rotation).",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... wait, ana nsit — kifech on passe de la forme algébrique à la forme exponentielle exactement? mafhamtch wallah 😅 fahhemni step by step",
            hasTrap: false,
            trapHint: null,
          },
          {
            text: "ok kho, so if z = 2 + 2i... l'argument c'est juste arctan(2/2) = π/4 right? c'est ça? mich lazem nzidou chwaya?",
            hasTrap: true,
            trapHint: "🚨 Trap: L'argument est correct ici (π/4), mais Rami a volontairement omis de vérifier le quadrant. Toujours vérifier avec les signes de Re(z) et Im(z).",
          },
          {
            text: "ama kifech on sait que l'argument est modulo 2π? twahhalt wallah 😭 vraiment mafhamtch pourquoi on peut pas juste laisser 5π/4",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [
          {
            text: "ok haka bro... ama si j'ai z^n, l'argument c'est juste n × θ right? direct? mich lazem faire autre chose? wallah nsit 😅",
            hasTrap: true,
            trapHint: "🚨 Trap: Oui, arg(z^n) = n×arg(z) MAIS modulo 2π! Rami oublie de réduire l'angle. C'est le piège classique du Bac.",
          },
        ],
      },

      analysisLimits: {
        label: "Limites & Continuité",
        emoji: "📈",
        bareme_notes: [
          "Définir le domaine de définition AVANT de calculer une limite.",
          "L'application du théorème des valeurs intermédiaires (TVI) nécessite de justifier la continuité sur l'intervalle.",
          "La règle de L'Hôpital est hors programme — utiliser les formes factorisées et les limites remarquables.",
        ],
        traps: [
          {
            id: "an_trap_1",
            description: "Using L'Hôpital's rule (not in curriculum).",
            french: "Appliquer la règle de L'Hôpital qui est hors programme. Le correcteur peut refuser et mettre zéro.",
          },
          {
            id: "an_trap_2",
            description: "Not defining domain before stating continuity.",
            french: "Dire 'f est continue' sans définir Df d'abord — le correcteur exige la mention explicite du domaine.",
          },
          {
            id: "an_trap_3",
            description: "Forgetting domain restrictions for ln(x) or sqrt(x).",
            french: "Calculer lim(ln(x)) ou lim(√x) sans préciser x > 0 dans le domaine.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach... bro ana twahhalt. Pour calculer lim(x→0) de (sin(x)/x), on peut just appliquer L'Hôpital right? c'est plus facile mich sahiha?",
            hasTrap: true,
            trapHint: "🚨 Trap: L'Hôpital est hors programme Bac! Utiliser la limite remarquable sin(x)/x → 1. Rami testait si tu vas faire l'erreur classique.",
          },
          {
            text: "ok kho, ama pour dire qu'une fonction est continue sur [a,b] et donc appliquer le TVI... c'est suffisant de juste le dire? mich lazem justifier wallah?",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [
          {
            text: "wach bro mafhamtch — si f est dérivable en a, ça veut dire automatiquement qu'elle est continue en a right? et l'inverse aussi? 😅",
            hasTrap: true,
            trapHint: "🚨 Trap: Dérivable ⟹ Continue (VRAI), mais Continue ⟹ Dérivable (FAUX). Ex: f(x)=|x| est continue en 0 mais pas dérivable.",
          },
        ],
      },

      integration: {
        label: "Intégrales & Primitives",
        emoji: "∫",
        bareme_notes: [
          "La constante d'intégration C est obligatoire pour les primitives — perdre C = perdre les points.",
          "Pour l'intégration par parties, montrer la formule UV - ∫V'U avant d'appliquer.",
          "Les bornes doivent être précises; une erreur de borne = résultat complètement faux.",
        ],
        traps: [
          {
            id: "int_trap_1",
            description: "Missing the constant C in primitives.",
            french: "Oublier la constante d'intégration C dans une primitive — erreur très fréquente, pénalisée systématiquement.",
          },
          {
            id: "int_trap_2",
            description: "Wrong boundary substitution in definite integrals.",
            french: "Confondre les bornes dans ∫[a→b], surtout après intégration par parties (les bornes changent dans certains cas).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro fahhemni — si on cherche une primitive de f(x) = 2x, c'est juste x² right? c'est fini? mich lazem nzidou chwaya?",
            hasTrap: true,
            trapHint: "🚨 Trap: La primitive est x² + C! La constante C est obligatoire. Sans elle, tu perds les points de la question primitive.",
          },
          {
            text: "ama kifech on choisit U et V' dans l'intégration par parties? wallah nsit la règle 😅 fahhemni",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [],
      },

      sequences: {
        label: "Suites Réelles",
        emoji: "🔢",
        bareme_notes: [
          "Pour montrer qu'une suite converge, justifier qu'elle est monotone ET bornée.",
          "La limite d'une suite récurrente se trouve en résolvant f(l) = l, mais il faut JUSTIFIER la convergence d'abord.",
        ],
        traps: [
          {
            id: "seq_trap_1",
            description: "Finding limit of recursive sequence without proving convergence first.",
            french: "Poser f(l) = l et résoudre sans avoir justifié la convergence — le correcteur pénalise l'ordre logique.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... pour trouver la limite de la suite récurrente U(n+1) = f(U(n)), on résout juste f(l) = l right? c'est tout? mich lazem faire autre chose avant?",
            hasTrap: true,
            trapHint: "🚨 Trap: Il FAUT d'abord prouver que la suite converge (monotone + bornée) AVANT de résoudre f(l) = l. Sinon zéro pour cette étape.",
          },
        ],
        followup_traps: [],
      },

      probability: {
        label: "Probabilités",
        emoji: "🎲",
        bareme_notes: [
          "La loi binomiale ne s'applique que si les épreuves sont indépendantes et identiques — toujours justifier.",
          "P(A∩B) = P(A)×P(B) uniquement si A et B sont indépendants — ne pas confondre avec événements incompatibles.",
        ],
        traps: [
          {
            id: "prob_trap_1",
            description: "Confusing independence and mutual exclusivity.",
            french: "Confondre 'événements indépendants' (P(A∩B)=P(A)P(B)) et 'événements incompatibles' (P(A∩B)=0).",
          },
        ],
        feynman_prompts: [
          {
            text: "kho mafhamtch — si A et B sont incompatibles, ça veut dire qu'ils sont indépendants right? c'est la même chose non?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Incompatibles ≠ Indépendants. Si A et B sont incompatibles et P(A)≠0, ils sont forcément DÉPENDANTS.",
          },
        ],
        followup_traps: [],
      },

      arithmetic: {
        label: "Arithmétique (Bac Math)",
        emoji: "🔣",
        bareme_notes: [
          "Bezout: les solutions de au + bv = d ne sont complètes que si on donne la solution générale.",
          "Gauss: son application nécessite de vérifier la condition pgcd(a,b)=1 explicitement.",
        ],
        traps: [
          {
            id: "arith_trap_1",
            description: "Not giving the general solution for Bezout.",
            french: "Donner une seule solution particulière de Bezout sans écrire la solution générale — perdre tous les points de généralisation.",
          },
        ],
        feynman_prompts: [
          {
            text: "bro fahhemni — pour le théorème de Gauss, on dit: si a | bc alors a | c ... c'est ça right? mich lazem une condition?",
            hasTrap: true,
            trapHint: "🚨 Trap: Le théorème de Gauss dit: si a|bc ET pgcd(a,b)=1, ALORS a|c. La condition pgcd=1 est indispensable!",
          },
        ],
        followup_traps: [],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICAL SCIENCES — PHYSICS
  // ─────────────────────────────────────────────────────────────
  physique: {
    label: "Physique",
    emoji: "⚡",
    color: "#f59e0b",
    subtopics: {

      rlcCircuits: {
        label: "Circuits RLC",
        emoji: "🔌",
        bareme_notes: [
          "Donner l'expression littérale avant de substituer les valeurs numériques.",
          "Les unités doivent être en SI systématiquement (Henry, Farad, Ohm, seconde).",
          "Lire la pente de la tangente en t=0 sur le graphe — ne pas confondre avec la valeur asymptotique.",
        ],
        traps: [
          {
            id: "rlc_trap_1",
            description: "Misreading graph tangent at t=0.",
            french: "Confondre la pente de la tangente en t=0 avec la valeur finale (asymptote) lors de la lecture graphique d'un circuit RC.",
          },
          {
            id: "rlc_trap_2",
            description: "Wrong units — using μF instead of F.",
            french: "Laisser la capacité en μF (microfarads) dans la formule au lieu de convertir en Farads (×10⁻⁶).",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... pour un circuit RC, la constante de temps τ = RC right? si R = 1kΩ et C = 100μF, alors τ = 100 right? en quelles unités?",
            hasTrap: true,
            trapHint: "🚨 Trap: τ = RC = 1000 × 100×10⁻⁶ = 0.1 seconde (100ms). Ne pas oublier de convertir μF en F! Rami a 'oublié' la conversion.",
          },
          {
            text: "ama kifech on lit la pente en t=0 sur le graphe d'un circuit RL? twahhalt wallah 😭 fahhemni",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [
          {
            text: "ok haka... ama pour les oscillations forcées, la résonance ça arrive quand ω = 1/√(LC) right? mich sahiha?",
            hasTrap: false,
            trapHint: null,
          },
        ],
      },

      mechanics: {
        label: "Mécanique",
        emoji: "⚙️",
        bareme_notes: [
          "Choisir le sens positif et le préciser explicitement avant d'appliquer la 2ème loi de Newton.",
          "Le travail W = F·d·cos(θ) — préciser l'angle entre F et le déplacement.",
          "Pour un pendule, l'approximation des petits angles doit être justifiée (θ < 10°).",
        ],
        traps: [
          {
            id: "mec_trap_1",
            description: "Not stating positive direction in Newton's 2nd law.",
            french: "Appliquer ΣF = ma sans avoir précisé le sens positif choisi — erreur de signe possible sur toute la suite.",
          },
          {
            id: "mec_trap_2",
            description: "Wrong angle in work formula.",
            french: "Mettre cos(0) au lieu de cos(θ) quand la force n'est pas parallèle au déplacement.",
          },
        ],
        feynman_prompts: [
          {
            text: "bro mafhamtch — pour appliquer la 2ème loi de Newton, on écrit juste ΣF = ma right? c'est tout? mich lazem faire autre chose avant?",
            hasTrap: true,
            trapHint: "🚨 Trap: Il faut TOUJOURS préciser le sens positif choisi avant d'écrire l'équation! Sans cela, les signes peuvent être inversés.",
          },
        ],
        followup_traps: [],
      },

      nuclearPhysics: {
        label: "Physique Nucléaire",
        emoji: "☢️",
        bareme_notes: [
          "Toujours vérifier la conservation du nombre de masse A et du numéro atomique Z.",
          "E = Δm × c² avec Δm en kg et c = 3×10⁸ m/s — ne pas utiliser des unités mixtes.",
          "La demi-vie t½ est liée à la constante de désintégration λ par: t½ = ln(2)/λ.",
        ],
        traps: [
          {
            id: "nuc_trap_1",
            description: "Using mass in atomic units directly in E=mc².",
            french: "Utiliser Δm en u.m.a. (unités de masse atomique) directement dans E = Δm×c² sans convertir en kg.",
          },
        ],
        feynman_prompts: [
          {
            text: "kho... pour calculer l'énergie libérée dans une réaction nucléaire, on fait juste E = Δm × c² avec Δm en grammes right? c'est suffisant?",
            hasTrap: true,
            trapHint: "🚨 Trap: Δm doit être en kilogrammes (kg)! Si tu utilises des grammes ou des u.m.a. directement, le résultat sera faux de plusieurs ordres de grandeur.",
          },
        ],
        followup_traps: [],
      },

      waves: {
        label: "Ondes",
        emoji: "〰️",
        bareme_notes: [
          "La célérité v, la fréquence f, et la longueur d'onde λ sont liées par v = λf.",
          "Les ondes mécaniques nécessitent un milieu de propagation — les ondes EM non.",
        ],
        traps: [
          {
            id: "wave_trap_1",
            description: "Applying mechanical wave rules to electromagnetic waves.",
            french: "Dire qu'une onde électromagnétique a besoin d'un milieu matériel pour se propager — confusion avec les ondes mécaniques.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... les ondes sonores et les ondes lumineuses se propagent de la même façon right? elles ont besoin toutes les deux d'un milieu?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Les ondes sonores (mécaniques) ont besoin d'un milieu. Les ondes lumineuses (EM) se propagent dans le vide!",
          },
        ],
        followup_traps: [],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICAL SCIENCES — CHEMISTRY
  // ─────────────────────────────────────────────────────────────
  chimie: {
    label: "Chimie",
    emoji: "🧪",
    color: "#ec4899",
    subtopics: {

      kinetics: {
        label: "Cinétique Chimique",
        emoji: "⏱️",
        bareme_notes: [
          "Le taux d'avancement final: si la réaction est totale, τ=1; sinon τ<1.",
          "La vitesse de réaction est toujours positive — attention au signe du Δ[réactif] (négatif).",
          "Convertir le temps en secondes pour les calculs de vitesse.",
        ],
        traps: [
          {
            id: "kin_trap_1",
            description: "Leaving time in minutes/hours in kinetics calculations.",
            french: "Utiliser le temps en minutes ou heures dans v = Δ[X]/Δt au lieu de convertir en secondes.",
          },
          {
            id: "kin_trap_2",
            description: "Not taking absolute value of reaction rate.",
            french: "Donner une vitesse de disparition négative — la vitesse est TOUJOURS positive (valeur absolue).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro mafhamtch — si une réaction est totale, est ce que ça veut dire que le taux d'avancement τ vaut 0 à la fin? wallah nsit",
            hasTrap: true,
            trapHint: "🚨 Trap: Si la réaction est TOTALE, τ = 1 (pas 0)! τ = 0 au début. À la fin d'une réaction totale, les réactifs sont épuisés donc τ = 1.",
          },
          {
            text: "ama kifech on calcule la vitesse de réaction à partir d'un graphe? fahhemni step by step kho",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [],
      },

      equilibrium: {
        label: "Équilibre Chimique (Estérification/Hydrolyse)",
        emoji: "⚖️",
        bareme_notes: [
          "L'estérification et l'hydrolyse sont des réactions inverses et lentes.",
          "Le taux d'estérification est limité (environ 2/3 soit ~67%) — c'est une réaction limitée.",
          "Pour déplacer l'équilibre, utiliser l'excès d'un réactif, éliminer un produit, ou changer T.",
        ],
        traps: [
          {
            id: "eq_trap_1",
            description: "Saying esterification is a total reaction.",
            french: "Confondre l'estérification (réaction limitée, τ ≈ 67%) avec une réaction totale. C'est l'une des erreurs les plus fréquentes.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach kho... l'estérification c'est une réaction totale right? on attend just assez longtemps et ça finit à 100%?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! L'estérification est une réaction LIMITÉE (~67%). Elle n'atteint jamais 100% car c'est une réaction d'équilibre.",
          },
        ],
        followup_traps: [],
      },

      acidsAndBases: {
        label: "Acides & Bases (pH)",
        emoji: "🧫",
        bareme_notes: [
          "pH = -log[H₃O⁺] — ne pas confondre avec pKa.",
          "Pour un acide faible: [H₃O⁺] = √(Ka × C) si le taux d'ionisation est faible.",
          "Au point d'équivalence d'un titrage: n_acide = n_base versés.",
        ],
        traps: [
          {
            id: "ph_trap_1",
            description: "Using the strong acid formula for a weak acid.",
            french: "Calculer [H₃O⁺] = C pour un acide faible au lieu de [H₃O⁺] = √(Ka × C).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro pour calculer le pH d'une solution d'acide acétique (faible) de concentration 0.1 mol/L... on fait just pH = -log(0.1) = 1 right?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Cette formule (pH = -log C) est pour les ACIDES FORTS seulement. Pour l'acide acétique (faible), [H₃O⁺] = √(Ka × C), donc pH = ½(pKa - log C).",
          },
        ],
        followup_traps: [],
      },

      redox: {
        label: "Oxydoréduction & Électrolyse",
        emoji: "🔋",
        bareme_notes: [
          "Dans une pile: l'anode est le pôle négatif (oxydation), la cathode est le pôle positif (réduction).",
          "Dans une électrolyse: l'anode est le pôle positif (oxydation), la cathode est le pôle négatif (réduction).",
          "La quantité de matière déposée: n = Q/(nₑ × F) où F = 96500 C/mol.",
        ],
        traps: [
          {
            id: "redox_trap_1",
            description: "Confusing anode/cathode roles in pile vs electrolysis.",
            french: "Inverser le rôle de l'anode et de la cathode: dans une PILE l'anode est (-), dans une ÉLECTROLYSE l'anode est (+). Pièges classiques du Bac.",
          },
        ],
        feynman_prompts: [
          {
            text: "kho mafhamtch — dans une pile ET dans une électrolyse, la cathode c'est toujours là où se passe la réduction right? c'est la seule règle?",
            hasTrap: false,
            trapHint: null,
          },
          {
            text: "ok haka... ama dans une pile, l'anode c'est le pôle positif right? comme dans une électrolyse?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Dans une PILE, l'anode est le pôle NÉGATIF. Dans une ÉLECTROLYSE, l'anode est le pôle POSITIF. C'est l'inverse!",
          },
        ],
        followup_traps: [],
      },
    },
  },
};

/**
 * Helper: get all subtopics for a given subject key.
 * @param {string} subjectKey - e.g. 'maths', 'physique', 'chimie'
 * @returns {Array} Array of { key, label, emoji }
 */
function getSubtopics(subjectKey) {
  const subject = BAC_CURRICULUM[subjectKey];
  if (!subject) return [];
  return Object.entries(subject.subtopics).map(([key, val]) => ({
    key,
    label: val.label,
    emoji: val.emoji,
  }));
}

/**
 * Helper: get a random Feynman prompt for a given topic/subtopic.
 * @param {string} subjectKey
 * @param {string} subtopicKey
 * @param {boolean} useFollowup - if true, pull from followup_traps instead
 * @returns {object} prompt object { text, hasTrap, trapHint }
 */
function getPrompt(subjectKey, subtopicKey, useFollowup = false) {
  const subtopic = BAC_CURRICULUM[subjectKey]?.subtopics?.[subtopicKey];
  if (!subtopic) return null;
  const pool = useFollowup && subtopic.followup_traps.length > 0
    ? subtopic.followup_traps
    : subtopic.feynman_prompts;
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Helper: get all trap descriptions for a given topic/subtopic.
 * @param {string} subjectKey
 * @param {string} subtopicKey
 * @returns {Array} Array of trap objects
 */
function getTraps(subjectKey, subtopicKey) {
  return BAC_CURRICULUM[subjectKey]?.subtopics?.[subtopicKey]?.traps ?? [];
}

/**
 * Helper: get barème notes for a given topic/subtopic.
 * @param {string} subjectKey
 * @param {string} subtopicKey
 * @returns {Array} Array of strings
 */
function getBaremeNotes(subjectKey, subtopicKey) {
  return BAC_CURRICULUM[subjectKey]?.subtopics?.[subtopicKey]?.bareme_notes ?? [];
}
