# My Bestfriend Birthday Website

A personal birthday surprise website built with React, Vite, Tailwind CSS, Framer Motion, Howler, and React Confetti.

The site shows a waiting room before the birthday and unlocks the birthday reveal on:

```txt
14 June 2026, 12:00 AM IST
```

The real unlock date is configured in [src/BirthdayController.jsx](src/BirthdayController.jsx).

## Features

- Countdown waiting room before the birthday
- Birthday reveal screen with confetti
- Letter reveal interaction
- Memory/photo gallery
- Background music selection and playback controls
- Test mode for previewing the birthday reveal before 14 June

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```txt
http://127.0.0.1:5173/
```

## Test The Birthday Reveal Now

To preview the birthday website before the real date, add this query parameter:

```txt
http://127.0.0.1:5173/?birthdayTest=true
```

The normal URL still follows the real birthday countdown.

## Useful Commands

Run a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Editing Content

- Birthday date: [src/BirthdayController.jsx](src/BirthdayController.jsx)
- Name and countdown display options: [src/config/siteConfig.js](src/config/siteConfig.js)
- Waiting room: [src/pages/WaitingRoom.jsx](src/pages/WaitingRoom.jsx)
- Birthday reveal: [src/pages/BirthdayReveal.jsx](src/pages/BirthdayReveal.jsx)
- Letter text: [src/pages/LetterReveal.jsx](src/pages/LetterReveal.jsx)
- Memory gallery: [src/pages/MemoryReveal.jsx](src/pages/MemoryReveal.jsx) and [src/pages/PhotoGallery.jsx](src/pages/PhotoGallery.jsx)
- Music tracks: [src/context/MusicContext.jsx](src/context/MusicContext.jsx)

## Assets

Photos are loaded from:

```txt
src/assets/photos/
```

Music files are loaded from:

```txt
src/assets/music/
```

After adding new assets, restart the dev server if Vite does not pick them up automatically.

## Notes

Browser autoplay rules may block music until the visitor interacts with the page. The music player appears when playback starts or when playback is blocked, so the visitor can press Play manually.
