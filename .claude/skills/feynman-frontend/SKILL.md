---
name: feynman-frontend
description: >
  Governs all UI/UX decisions, layout rules, progressive disclosure patterns,
  and the Tunisian code-switching (Derja + French + English slang) language
  rules for the SheetCode "Lost Classmate" Feynman Technique app. Activate
  this skill whenever writing or modifying any frontend code, AI dialogue
  strings, or CSS/JS for the SheetCode application.
---

# Feynman Frontend Skill

## Purpose

This skill ensures every code change to the SheetCode UI and every dialogue
string written for the AI persona "Rami 🎒 (The Lost Classmate)" is consistent
with the app's design principles, the Tunisian Bac curriculum context, and the
Derja code-switching language register.

---

## 1. UI/UX Architecture Rules

### 1.1 Layout — Non-Negotiable
- The viewport is **always split vertically into two equal halves** using `100dvh`.
- **Top half**: AI Persona Panel (Rami). Never allow this to collapse or scroll.
- **Bottom half**: Student Webcam Panel. Never allow this to collapse or scroll.
- No sidebars. No navigation drawers. The call metaphor is sacred.
- All controls (topic picker, mute, end call) live in a floating HUD **overlaid** on the panels, never outside them.

### 1.2 Visual Design — Dark Glassmorphism
- Background: deep navy gradient `from-[#0a0e1a] to-[#0d1225]`
- Glass panels: `bg-white/5 backdrop-blur-xl border border-white/10`
- Primary accent: Electric green `#00ff94` — used for active states, pulse rings, speaking indicators
- Secondary accent: Electric purple `#a855f7` — used for student panel accents
- Text: `white` for headings, `white/70` for secondary, `white/40` for placeholders
- Fonts: Space Grotesk (UI), Noto Sans Arabic (for any Arabic/Derja text fallback)

### 1.3 Audio Visualizer (AI Panel)
- **Always animated** — decorative fake visualizer with CSS `@keyframes` when AI is idle
- **Intensifies** (faster, taller bars) when AI is in `speaking` state
- Implemented with a `<canvas>` element and `requestAnimationFrame`
- 12–20 bars, random heights, green color with 60% opacity

### 1.4 Progressive Disclosure — Interaction Flow
The app must reveal complexity in exactly this sequence. Never skip steps.

**Stage 0 — Idle (default on load)**
- Show: Rami's avatar + "Appuyez sur Start Call pour commencer" placeholder
- Hide: all topic pickers, dialogue box, AI speech

**Stage 1 — Call Connected**  
- Reveal: topic dropdown with animation (`transition-all duration-500`)
- Hide: start button, replace with live call indicator

**Stage 2 — Topic Selected**
- Reveal: subtopic dropdown (filtered from `BAC_CURRICULUM[topic]`)
- Show a soft "Rami is thinking…" state

**Stage 3 — Session Active**
- Reveal: full dialogue box with AI's Feynman question
- Enable: student mic toggle
- Show: trap warning badge (subtle, appears only when a known trap is embedded in the question)

**Stage 4 — Escalation Mode** (triggered after 2+ student turns)
- Rami's confusion level increases
- Dialogue badge changes to 🚨 emoji + "Rami est perdu wallah!"
- New harder follow-up question surfaces from `followup_traps` array

---

## 2. Derja Code-Switching Language Rules

### 2.1 Core Principle
Every string Rami says must feel like a real Tunisian student texting a friend.
**Never use Fusha (formal Arabic)**. The target register is:
> Tunisian Derja + French scientific vocabulary + English internet slang

### 2.2 Register Mixing Formula
- **Math/Science terms**: Always in **French** (e.g., "intégrale", "module", "circuit RLC")
- **Connectors and filler**: Tunisian Derja (see phrase bank below)
- **Confusion/emoji expressions**: English internet slang ("wait what", "bro", "ngl")
- **Never**: formal Modern Standard Arabic, never "يجب أن" — use "lazem" instead

### 2.3 Derja Phrase Bank (Required Vocabulary)

| Meaning | Derja phrase | Use case |
|---|---|---|
| Wait, what? | "wach?!" | Confusion reaction |
| I don't understand | "mafhamtch" | Expressing confusion |
| Seriously? | "vraiment?" | Disbelief |
| I swear | "wallah" | Emphasis |
| Brother/friend | "bro" / "kho" | Address student |
| It's not right | "mich sahiha" | Trap hint (subtle) |
| I got lost | "twahhalt" | Escalation |
| Can you explain? | "fahhemni" | Feynman trigger |
| That's it! | "haka!" | Positive reinforcement |
| But how? | "ama kifech?" | Follow-up probe |
| OK but | "ok walakin" | Partial understanding |
| I forgot | "nsit" | Trap setup |

### 2.4 Sentence Construction Examples

**Good (correct register):**
> "wach bro... wait, ana nsit — kifech on calcule le module d'un nombre complexe exactement? mafhamtch wallah 😅"

**Bad (do not generate):**
> "يجب عليك شرح مفهوم العدد المركب" ← Too formal, never use this

**Good escalation:**
> "ok kho haka... ama kifech on sait que l'argument est modulo 2π? twahhalt wallah 😭 fahhemni encore"

### 2.5 Trap Embedding Rules
- When embedding an exam trap, Rami must present it as an **innocent wrong assumption**
- Example: "ah so on peut juste mettre C = 0 dans la primitive, right bro? mich lazem ncriviha?"
- The UI shows a subtle `🚨` badge on the dialogue card to hint to the student a trap is present
- The badge tooltip explains the trap in plain French (for the student's benefit after they answer)

---

## 3. Webcam Panel Rules

- Always request camera with `{ video: { facingMode: 'user' }, audio: true }`
- If permission denied: show a friendly "📷 Caméra bloquée — pas grave, continue!" overlay
- Mirror the video feed horizontally (`transform: scaleX(-1)`)
- Overlay student name in bottom-left corner with glassmorphism tag
- Mute button toggles `audio track.enabled` — never stops the stream

---

## 4. Component Modification Guidelines

When modifying any component:
1. **Check Stage** — which disclosure stage is this component visible in?
2. **Preserve register** — all text strings must pass the Derja code-switching rules above
3. **Maintain split layout** — never add elements that break the 50/50 split
4. **Animate transitions** — any show/hide must use `transition-all duration-500 ease-in-out`
5. **Test trap badge** — if dialogue changes, verify trap badge logic still maps correctly to `feynman_prompts[i].hasTrap`

---

## 5. Quick Reference — Progressive Disclosure Trigger Map

```
load()          → Stage 0 (idle)
startCall()     → Stage 1 (webcam on, topic picker appears)
selectTopic()   → Stage 2 (subtopic picker appears, Rami "thinks")
selectSubtopic()→ Stage 3 (first Feynman question fires)
studentTurns≥2  → Stage 4 (escalation, harder trap question)
endCall()       → Stage 0 (reset, keep topic/subtopic selection)
```
