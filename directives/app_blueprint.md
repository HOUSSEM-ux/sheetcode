# Directive: SheetCode App Engine

## 1. Goal
Build a mobile-first, single-page web app (HTML, Tailwind CSS, Vanilla JavaScript) that simulates an audio/video call using the Feynman Technique. 

## 2. Data Source
The agent must read and scrape the target URLs listed in the root link.txt file to learn the Tunisian Baccalaureate curriculum, exam traps, and official grading metrics (le barème). All scraped intermediate data must be stored in the temporary/ folder.

## 3. Core App Features
- **UI Layout:** Split-screen format. Top half features the AI persona profile with a pulsing audio visualizer. Bottom half utilizes the browser webcam API for the student's camera view.
- **AI Persona ("The Lost Classmate"):** Plays dumb, acts confused, throws common exam traps at the student, and forces them to explain concepts out loud.
- **Language Layer:** Natively support and reply in Tunisian Code-Switching (mixing Tunisian Derja, French scientific terms, and English slang). Avoid formal Arabic (Fusha) entirely.

## 4. Deliverable
A final structured UI code file and a companion data structure mapped to the official curriculum criteria.
