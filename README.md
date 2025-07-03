# Tricky Words App

Support children learning to read English by showing tricky words, one at a time. A parent listens and clicks “Right” or “Wrong” to track reading accuracy.

## Build Plan

**MVP 1 - Core Functionality**

- Start button ✔️
- Display 1 word at a time (total of 10 words) ✔️
- Right/wrong buttons ✔️
- Track score ✔️
- Track progress ✔️
- Show a summary at the end ✔️

**MVP 2 - Improve Usability**

- Styling/UI/UX ✔️
- Variable number of words per round ✔️
- Variable levels/difficulty of words ✔️

**Stretch Goals/Further Ideas**

- User log-in ✔️ (localStorage)
- Reward system ✔️ (localStorage)
- Setup of external database to store words, users, stats etc.
- Custom tricky words
- Mobile/tablet compatibility
- Text to speech API https://cloud.google.com/text-to-speech
- AI suggestion for new words

## Tech Stack

**Frontend:**

- React (JavaScript)
- Vite
- CSS

**Testing:**

- Vitest
- React Testing Library
- jest-dom

**Backend**

- Node.js with Express
- PostgreSQL

**Deployment**

- Vercel (frontend)
- Render (backend)
