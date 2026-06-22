# German A1 Trainer 🇩🇪

A spaced-repetition flashcard app for German A1 vocabulary and grammar, with practice
drills, mock tests, and AI-assisted card creation. Built with React + Vite.

## Features

### 📚 Spaced Repetition (Study tab)
- **SM-2 scheduling** (the SuperMemo / Anki algorithm). Rate each card **Again / Hard /
  Good / Easy** — the interval grows with every correct recall, so you only re-see a card
  right before you'd forget it.
- Each button shows the *exact* next interval before you tap it.
- Daily new-card limit (adjustable) so you're never flooded.
- **Progress persists across sessions** when storage is available.

### 🎯 Practice (Practice tab)
- **Six drill formats:** True/False, Numbers (1–100, generated), Reading comprehension,
  English → German translation, Languages (Land → Sprache), and Time (die Uhrzeit).
- **12 vocabulary decks** as two-sided flip cards (Self-Intro, Greetings, Family, Verbs,
  Hobbies, etc.) with a flashcard mode and a multiple-choice quiz mode.
- **5 randomized mock tests** — 30 MCQs each, 5 from every section.
- A **Translate** button (hotkey `T`) reveals the English breakdown after you answer any
  German-prompt question — including the grammar rule for tricky Time/Number questions.

### ⚙️ Manage (Manage tab)
- Add your own cards three ways: **paste** (`front | back` per line), **AI generate** from
  raw notes, or **type** them individually.
- Browse, search, and delete cards; tune new-cards-per-day; reset all progress.

### 🌙 Other
- **Dark mode** toggle (top-right, persisted).
- **Full keyboard control:** `Space` flip · `1–4` answer/rate · `Enter` next · `T` translate
  · `Esc` back.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

```bash
npm run build     # production build into dist/
npm run preview   # preview the build
```

## Tech

- **React 18** + **Vite 5**
- **lucide-react** for icons
- **Tailwind CSS** via CDN (loaded in `index.html` — zero build config)
- Dark theme implemented as a `.dark` class on `<html>` with a CSS layer injected at runtime,
  so it overrides Tailwind utilities without `!important`.

## Notes

- The AI card generator and cross-session persistence rely on browser APIs that are present
  in some host environments and not others; the app degrades gracefully (it shows
  "session only" / an AI-unavailable message) and everything else keeps working.
- Tailwind is loaded via CDN for simplicity. For a production deployment you'd typically
  install Tailwind as a PostCSS plugin instead.
