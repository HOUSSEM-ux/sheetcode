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

  // ─────────────────────────────────────────────────────────────
  // GEOGRAPHY (GÉOGRAPHIE)
  // ─────────────────────────────────────────────────────────────
  geographie: {
    label: "Géographie",
    emoji: "🗺️",
    color: "#10b981",
    subtopics: {

      geomorphologie: {
        label: "Géomorphologie & Relief",
        emoji: "⛰️",
        bareme_notes: [
          "Distinguer tectonique des plaques (origine interne) et érosion (origine externe).",
          "La théorie de Wegener (1912) était correcte mais sans mécanisme prouvé — la preuve viendra des dorsales océaniques.",
          "Les types de roches: magmatiques, sédimentaires, métamorphiques — justifier leur formation.",
        ],
        traps: [
          {
            id: "geo_trap_1",
            description: "Confusing the cause of mountain formation.",
            french: "Dire que les montagnes sont formées uniquement par l'érosion, en oubliant que la compression tectonique est la cause principale.",
          },
          {
            id: "geo_trap_2",
            description: "Saying Wegener had proof for continental drift.",
            french: "Affirmer que Wegener avait des preuves directes de la dérive — il n'avait que des indices (côtes, fossiles). Le mécanisme a été prouvé plus tard par les dorsales.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... la dérive des continents c'est Wegener right? mais il avait des preuves directes ou just des indices? mafhamtch la différence wallah",
            hasTrap: false,
            trapHint: null,
          },
          {
            text: "kho fahhemni — les montagnes comme l'Atlas, elles se forment à cause de l'érosion right? le vent et l'eau les sculptent? mich c'est ça?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Les montagnes se forment par COMPRESSION TECTONIQUE (collision de plaques). L'érosion les use et les façonne, mais n'en crée pas. La cause principale est interne.",
          },
        ],
        followup_traps: [
          {
            text: "ok haka... ama les roches sédimentaires c'est just des roches magmatiques qui ont vieilli right? c'est la même famille?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Les roches sédimentaires viennent de la sédimentation de particules (argile, sable, fossiles). Les magmatiques viennent du refroidissement du magma. Ce sont deux origines totalement différentes.",
          },
        ],
      },

      climatologie: {
        label: "Climatologie & Zones Climatiques",
        emoji: "🌡️",
        bareme_notes: [
          "La Tunisie a un climat méditerranéen au nord (étés chauds secs, hivers doux humides) et aride/désertique au sud.",
          "Ne pas confondre météo (court terme) et climat (long terme, 30+ ans).",
          "Le changement climatique augmente la fréquence des événements extrêmes, pas leur force systématiquement.",
        ],
        traps: [
          {
            id: "clim_trap_1",
            description: "Confusing weather and climate.",
            french: "Utiliser 'météo' et 'climat' comme synonymes — la météo c'est le temps à court terme, le climat c'est la moyenne sur 30 ans minimum.",
          },
        ],
        feynman_prompts: [
          {
            text: "bro mafhamtch — quand on dit que la Tunisie a un climat méditerranéen, ça veut dire qu'il fait beau toute l'année right? jamais de pluie?",
            hasTrap: true,
            trapHint: "🚨 Trap: Non! Le climat méditerranéen = étés CHAUDS ET SECS + hivers DOUX ET PLUVIEUX. La pluie tombe surtout en automne-hiver, pas en été.",
          },
          {
            text: "ama la différence entre météo et climat, c'est just une question de mots right? c'est la même chose kho?",
            hasTrap: true,
            trapHint: "🚨 Trap: Non! Météo = conditions atmosphériques à court terme (aujourd'hui, cette semaine). Climat = moyenne des conditions sur minimum 30 ans. Une vague de chaleur est de la météo, pas du changement climatique en soi.",
          },
        ],
        followup_traps: [],
      },

      geographieTunisie: {
        label: "Géographie Humaine de la Tunisie",
        emoji: "🏙️",
        bareme_notes: [
          "L'exode rural = migration campagne → ville, pas l'inverse.",
          "La littoralisation = concentration de la population et des activités sur le littoral.",
          "Le taux d'urbanisation tunisien dépasse 65% — mais le développement régional reste inégal.",
        ],
        traps: [
          {
            id: "geo_hum_trap_1",
            description: "Confusing rural exodus direction.",
            french: "Définir l'exode rural comme 'les gens qui quittent la ville pour aller à la campagne' — c'est l'inverse! C'est campagne → ville.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach kho... l'exode rural en Tunisie c'est quand les gens quittent les villes pour aller habiter à la campagne right? mich sahiha?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! L'exode rural c'est CAMPAGNE → VILLE. Les populations rurales migrent vers les centres urbains à la recherche de travail et de services.",
          },
        ],
        followup_traps: [],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // HISTORY (HISTOIRE)
  // ─────────────────────────────────────────────────────────────
  histoire: {
    label: "Histoire",
    emoji: "📜",
    color: "#f97316",
    subtopics: {

      tunisieContemporaine: {
        label: "La Tunisie Contemporaine",
        emoji: "🕊️",
        bareme_notes: [
          "L'indépendance tunisienne est le 20 mars 1956 — pas 1955 (date des accords d'autonomie interne).",
          "Habib Bourguiba est le premier président (1957–1987), remplacé par Ben Ali lors du 'changement' du 7 novembre 1987.",
          "La Révolution de 2010–2011 (Révolution du Jasmin) est la première révolution du Printemps Arabe.",
        ],
        traps: [
          {
            id: "hist_trap_1",
            description: "Confusing 1955 and 1956 for Tunisian independence.",
            french: "Confondre 1955 (autonomie interne, accords Mendès France) et 1956 (indépendance officielle, 20 mars). Ce sont deux dates distinctes.",
          },
        ],
        feynman_prompts: [
          {
            text: "bro fahhemni — l'indépendance de la Tunisie c'était en 1955 right? c'est là que Bourguiba est revenu? mafhamtch les dates wallah",
            hasTrap: true,
            trapHint: "🚨 Trap: 1955 = accords d'autonomie interne. L'indépendance OFFICIELLE c'est le 20 MARS 1956. Bourguiba est rentré en 1955, mais l'indépendance est proclamée en 1956.",
          },
          {
            text: "wach kho... le 7 novembre 1987, Bourguiba a démissionné volontairement right? il a pas été renversé?",
            hasTrap: true,
            trapHint: "🚨 Trap: Non! Ben Ali a déposé Bourguiba par un coup d'état constitutionnel (art. 57), le déclarant 'inapte médicalement'. C'était un changement de pouvoir forcé, présenté comme légal.",
          },
        ],
        followup_traps: [],
      },

      guerreFroide: {
        label: "La Guerre Froide",
        emoji: "❄️",
        bareme_notes: [
          "La Guerre Froide (1947–1991): opposition idéologique USA (capitalisme/démocratie) vs URSS (communisme).",
          "Pas de guerre directe entre les deux superpuissances — mais des guerres par procuration (Corée, Vietnam, Angola).",
          "La chute du mur de Berlin = 9 novembre 1989. La dissolution de l'URSS = 25 décembre 1991.",
        ],
        traps: [
          {
            id: "gc_trap_1",
            description: "Saying the Cold War had direct military confrontation.",
            french: "Dire que les USA et l'URSS se sont battus directement — JAMAIS! Ils s'affrontaient par pays interposés (guerres par procuration). La MAD (destruction mutuelle assurée) les dissuadait.",
          },
        ],
        feynman_prompts: [
          {
            text: "kho mafhamtch — pendant la Guerre Froide, les USA et l'URSS se sont affrontés militairement right? c'est pour ça qu'on appelle ça une 'guerre'?",
            hasTrap: true,
            trapHint: "🚨 Trap: JAMAIS d'affrontement direct! 'Froide' = pas de guerre chaude entre les deux. Ils s'affrontaient par pays interposés et par la course aux armements/espace. La bombe nucléaire créait la dissuasion (MAD).",
          },
          {
            text: "wach bro... le mur de Berlin est tombé en 1991 avec l'URSS right? c'est la même date?",
            hasTrap: true,
            trapHint: "🚨 Trap: Deux dates DIFFÉRENTES! Mur de Berlin = 9 novembre 1989. Dissolution de l'URSS = 25 décembre 1991. Deux événements distincts avec 2 ans d'écart.",
          },
        ],
        followup_traps: [
          {
            text: "ok haka kho... ama le plan Marshall c'était de l'aide humanitaire pure right? juste pour aider l'Europe à se reconstruire, sans intérêts politiques?",
            hasTrap: true,
            trapHint: "🚨 Trap: Le Plan Marshall avait un objectif géopolitique clair: empêcher la progression du communisme en Europe de l'Ouest en stabilisant économiquement ces pays. L'aide était réelle MAIS l'intention était aussi stratégique.",
          },
        ],
      },

      decolonisation: {
        label: "Décolonisation & Indépendances",
        emoji: "🌍",
        bareme_notes: [
          "La décolonisation est un processus des années 1945–1975, accéléré par la Seconde Guerre mondiale.",
          "Distinguer décolonisation pacifique (Inde 1947, Tunisie 1956) et violente (Algérie 1954–1962, Kenya).",
          "La Conférence de Bandung (1955) crée le mouvement des non-alignés — ni USA ni URSS.",
        ],
        traps: [
          {
            id: "decol_trap_1",
            description: "Saying all decolonization was violent.",
            french: "Affirmer que toutes les indépendances se sont faites par la guerre — certaines ont été négociées pacifiquement (Tunisie, Maroc, Inde).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro fahhemni — toutes les indépendances africaines et asiatiques se sont faites par des guerres right? comme l'Algérie?",
            hasTrap: true,
            trapHint: "🚨 Trap: Non! Certaines ont été négociées pacifiquement: Tunisie (1956), Maroc (1956), Inde (1947 - non-violence de Gandhi). L'Algérie est une exception brutale, pas la règle générale.",
          },
        ],
        followup_traps: [],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PHILOSOPHY (PHILOSOPHIE)
  // ─────────────────────────────────────────────────────────────
  philosophie: {
    label: "Philosophie",
    emoji: "🧠",
    color: "#8b5cf6",
    subtopics: {

      liberte: {
        label: "La Liberté & le Libre Arbitre",
        emoji: "🕊️",
        bareme_notes: [
          "Distinguer liberté négative (absence de contrainte) et liberté positive (capacité d'agir selon sa raison).",
          "Le déterminisme (Spinoza, Laplace) s'oppose au libre arbitre (Descartes, Kant).",
          "Sartre: 'l'existence précède l'essence' = l'homme est condamné à être libre.",
        ],
        traps: [
          {
            id: "lib_trap_1",
            description: "Thinking freedom means doing anything you want.",
            french: "Définir la liberté comme 'faire ce qu'on veut sans limites' — philosophiquement, la vraie liberté implique la raison et la responsabilité, pas l'arbitraire.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... être libre c'est juste pouvoir faire ce qu'on veut right? sans personne qui nous en empêche? mich c'est la définition?",
            hasTrap: true,
            trapHint: "🚨 Trap: C'est la définition naïve! Philosophiquement, la liberté implique la raison (Kant), la responsabilité (Sartre), et l'absence de déterminisme aveugle. 'Faire ce qu'on veut' sans raison c'est du caprice, pas la liberté.",
          },
          {
            text: "kho fahhemni — Sartre dit qu'on est 'condamnés à être libres'... ama si on est condamnés c'est qu'on est pas libres right? c'est une contradiction?",
            hasTrap: false,
            trapHint: null,
          },
        ],
        followup_traps: [
          {
            text: "ok haka kho... le déterminisme de Spinoza, ça dit que tout est causé right? donc le libre arbitre existe pas? c'est un fait prouvé ou just une opinion?",
            hasTrap: false,
            trapHint: null,
          },
        ],
      },

      verite: {
        label: "La Vérité & la Connaissance",
        emoji: "🔍",
        bareme_notes: [
          "Empirisme (Locke, Hume): la connaissance vient de l'expérience sensible.",
          "Rationalisme (Descartes, Kant): la raison est la source première de la connaissance vraie.",
          "Distinguer vérité formelle (logique/mathématique) et vérité matérielle (faits empiriques).",
        ],
        traps: [
          {
            id: "ver_trap_1",
            description: "Saying empiricism and rationalism are the same.",
            french: "Confondre empirisme et rationalisme — ce sont deux théories opposées: empirisme = sens, rationalisme = raison.",
          },
        ],
        feynman_prompts: [
          {
            text: "bro mafhamtch — Descartes et Locke, ils disent la même chose right? tous les deux ils cherchent la vérité, donc c'est pareil?",
            hasTrap: true,
            trapHint: "🚨 Trap: OPPOSÉS! Descartes (rationaliste) = la raison seule peut atteindre la vérité ('cogito ergo sum'). Locke (empiriste) = toute connaissance vient des sens. Deux méthodes radicalement différentes.",
          },
        ],
        followup_traps: [],
      },

      etatSociete: {
        label: "L'État & la Société",
        emoji: "🏛️",
        bareme_notes: [
          "Le contrat social: Hobbes (état naturel = guerre de tous contre tous → État autoritaire), Locke (état naturel = paix → État libéral), Rousseau (homme bon, société le corrompt).",
          "Distinguer légitimité (droit moral de gouverner) et légalité (conforme à la loi).",
          "La démocratie directe (Athènes) ≠ démocratie représentative (systèmes modernes).",
        ],
        traps: [
          {
            id: "etat_trap_1",
            description: "Saying Hobbes, Locke and Rousseau agree on the state of nature.",
            french: "Présenter les trois théoriciens du contrat social comme ayant la même vision de l'état naturel — ils s'opposent radicalement.",
          },
        ],
        feynman_prompts: [
          {
            text: "wach kho... Hobbes, Locke et Rousseau ils sont tous d'accord: l'état naturel de l'homme c'est la paix right? c'est pour ça qu'on a besoin d'un contrat social?",
            hasTrap: true,
            trapHint: "🚨 Trap: Ils DIVERGENT! Hobbes: état naturel = guerre ('homo homini lupus'). Locke: état naturel = paix relative. Rousseau: homme naturellement bon, corrompu par la société. Trois visions opposées!",
          },
        ],
        followup_traps: [],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // SVT (SCIENCES DE LA VIE ET DE LA TERRE)
  // ─────────────────────────────────────────────────────────────
  svt: {
    label: "SVT",
    emoji: "🧬",
    color: "#06b6d4",
    subtopics: {

      genetique: {
        label: "Génétique & Hérédité",
        emoji: "🧬",
        bareme_notes: [
          "Un chromosome ≠ un gène. Un chromosome contient des milliers de gènes.",
          "La méiose produit des cellules haploïdes (n), la mitose des cellules diploïdes (2n).",
          "Une mutation est une modification de la séquence d'ADN — peut être neutre, bénéfique ou délétère.",
        ],
        traps: [
          {
            id: "gen_trap_1",
            description: "Confusing chromosome and gene count.",
            french: "Dire qu'un chromosome = un gène — un chromosome contient des milliers de gènes. L'humain a 46 chromosomes mais ~20 000 gènes.",
          },
          {
            id: "gen_trap_2",
            description: "Confusing mitosis and meiosis ploidy.",
            french: "Dire que la mitose produit des cellules haploïdes — la mitose conserve la diploïdie (2n→2n). La méiose produit des cellules haploïdes (2n→n).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro fahhemni — le chromosome c'est fait d'ADN right? et l'ADN contient les gènes... donc 1 chromosome = 1 gène? mich c'est ça?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! 1 chromosome contient des MILLIERS de gènes! L'humain a 46 chromosomes mais environ 20 000 gènes. Le chromosome est la structure, le gène est l'unité d'information à l'intérieur.",
          },
          {
            text: "wach kho... la mitose et la méiose produisent toutes les deux des cellules haploïdes right? c'est pour ça qu'elles se ressemblent?",
            hasTrap: true,
            trapHint: "🚨 Trap: NON! La mitose = 2n → 2n (diploïde conservé). La méiose = 2n → n (haploïde). Seule la méiose produit des gamètes haploïdes. C'est l'erreur classique du Bac SVT.",
          },
        ],
        followup_traps: [
          {
            text: "ok haka bro... une mutation génétique c'est toujours dangereux right? ça cause des maladies systématiquement?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Une mutation peut être neutre (pas d'effet), bénéfique (avantage évolutif), ou délétère (maladie). La plupart des mutations sont neutres. L'évolution repose sur des mutations bénéfiques.",
          },
        ],
      },

      immunologie: {
        label: "Immunologie & Défenses de l'Organisme",
        emoji: "🛡️",
        bareme_notes: [
          "Immunité non-spécifique (innée): réaction rapide, sans mémoire, non ciblée (inflammation, phagocytose).",
          "Immunité spécifique (adaptative): lymphocytes B (anticorps) et T — mémoire immunologique, réponse ciblée.",
          "Un vaccin stimule la mémoire immunitaire SANS provoquer la maladie — antigènes affaiblis ou fragments.",
        ],
        traps: [
          {
            id: "imm_trap_1",
            description: "Saying vaccines cause the disease they prevent.",
            french: "Dire que le vaccin provoque la maladie — le vaccin contient des antigènes inactivés/atténués/fragments, pas l'agent pathogène complet en forme active.",
          },
          {
            id: "imm_trap_2",
            description: "Confusing innate and adaptive immunity.",
            french: "Confondre immunité innée (rapide, non spécifique, sans mémoire) et adaptative (lente, spécifique, avec mémoire — lymphocytes B et T).",
          },
        ],
        feynman_prompts: [
          {
            text: "wach bro... quand on se vaccine, le vaccin nous donne la maladie en version légère right? c'est pour ça que parfois on se sent mal après?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! Le vaccin contient des antigènes INACTIVÉS, ATTÉNUÉS ou des FRAGMENTS de l'agent pathogène — pas l'agent complet actif. La réaction post-vaccin (légère fièvre) = réponse immunitaire normale, pas la maladie.",
          },
          {
            text: "kho fahhemni — la phagocytose c'est une réponse immunitaire spécifique right? elle vise un microbe précis?",
            hasTrap: true,
            trapHint: "🚨 Trap: La phagocytose est une réponse INNÉE (non spécifique). Les phagocytes (macrophages, neutrophiles) avalent tout corps étranger sans distinction. La spécificité appartient à l'immunité adaptative (anticorps, lymphocytes T).",
          },
        ],
        followup_traps: [],
      },

      systemeNerveux: {
        label: "Système Nerveux & Réflexes",
        emoji: "🧠",
        bareme_notes: [
          "L'arc réflexe: récepteur → neurone afférent → centre nerveux (moelle) → neurone efférent → effecteur.",
          "Les réflexes spinaux (moelle épinière) n'impliquent pas le cerveau — c'est leur caractéristique.",
          "La synapse: transmission chimique par neurotransmetteurs (ex: acétylcholine), sens unique.",
        ],
        traps: [
          {
            id: "nerv_trap_1",
            description: "Saying reflexes involve the brain.",
            french: "Dire que les réflexes spinaux passent par le cerveau — le réflexe spinal est intégré dans la moelle épinière SANS passer par le cerveau. C'est sa définition même.",
          },
          {
            id: "nerv_trap_2",
            description: "Saying synaptic transmission is bidirectional.",
            french: "Dire que la transmission synaptique est bidirectionnelle — elle est UNIDIRECTIONNELLE: du neurone pré-synaptique vers le post-synaptique uniquement (sens des neurotransmetteurs).",
          },
        ],
        feynman_prompts: [
          {
            text: "bro wach... le réflexe rotulien (le genou), il passe par le cerveau right? c'est le cerveau qui décide de faire bouger la jambe?",
            hasTrap: true,
            trapHint: "🚨 Trap: NON! Le réflexe rotulien est un réflexe SPINAL — il est intégré dans la MOELLE ÉPINIÈRE, sans passer par le cerveau. C'est pourquoi la réaction est quasi-instantanée. Le cerveau est informé après coup.",
          },
          {
            text: "ama la synapse, le signal peut aller dans les deux sens right? neurone A → B et aussi B → A?",
            hasTrap: true,
            trapHint: "🚨 Trap: FAUX! La transmission synaptique est UNIDIRECTIONNELLE: toujours du neurone PRÉ-synaptique vers le POST-synaptique. Les neurotransmetteurs sont libérés dans un seul sens. Jamais l'inverse.",
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
