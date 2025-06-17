# Tricky Words App

Support children learning to read English by showing tricky words one at a time. A parent listens and clicks “Right” or “Wrong” to track reading accuracy.

## Build Plan

**MVP 1 - Core functionality**

- Start button
- Display 1 word at a time (total of 10 words)
- Right/wrong buttons
- Track score
- Track progress
- Show a summary at the end

**MVP 2 - Improve usability**

- Styling: sizing, fonts and colour
- Transitions/animations between words

**MVP 3 - Enhanced functionality**

- Text to speech API https://cloud.google.com/text-to-speech
- Mobile/tablet compatibility

**Stretch goals/further ideas**

- Words to be stored in external database
- User log-in
- Reward system
- Custom tricky words
- Words can be manually added/removed from library e.g. once it's no longer tricky for the reader anymore
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

**Backend (planned)**

- Node.js with Express
- PostgreSQL

**Deployment**

- Vercel (frontend)

## File Structure

```plaintext
tricky-words/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── HomeScreen/
│   │   │   └── HomeScreen.jsx
│   │   ├── WordCard/
│   │   │   └── WordCard.jsx
│   │   ├── ProgressBar/
│   │   │   └── ProgressBar.jsx
│   │   └── SummaryScreen/
│   │       └── SummaryScreen.jsx
│   ├── data/
│   │   └── trickyWords.json
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```
