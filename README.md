# Shannon — Video editing portfolio

React + Vite portfolio with an editorial, film-inspired design. Native CSS and IntersectionObserver handle motion; no animation library or scroll hijacking.

## Run

```sh
npm ci
npm run dev
npm run build
npm run lint
```

Vite produces the production site in `dist/`. Deploy that directory to a static host.

## Content

Edit `src/data/content.js` to maintain the projects, Google Drive/YouTube IDs, and toolkit. All seven original videos and the personal introduction are retained. The Color Grading feature adds **Capstone** and **Class**, named after the two files supplied by Shannon. There are nine work videos in total, plus the introduction.

The original `New Project 1` and `New Project 2` titles remain because no approved replacement titles were supplied. Placeholder descriptions were removed. The repository does not contain dated employment history, so no roles, dates, clients, or statistics were invented.

The email is Shannon's verified address from the completed developer portfolio. The original placeholder LinkedIn and email links were removed. Original profile image reference: `https://lh3.googleusercontent.com/d/1LbVOZQuwGlM1yjvE2ZO-9xnFCsNHf211`. That endpoint returned HTML during inspection; the About section uses an actual frame from Shannon's introduction instead.

## Media and accessibility

- Actual Drive and YouTube thumbnails replace stock photographs and placeholder artwork.
- Images below the hero load lazily; dimensions are reserved. If a thumbnail fails, an intentional text fallback keeps the watch button available.
- Players are mounted only after a click. No video or sound autoplays, and closing a player removes it.
- Native modal dialogs support Escape, focus containment, restored trigger focus, fullscreen playback, and a direct source link if an external player is unavailable.
- Drive/YouTube playback still depends on the owner's sharing settings and those external services. One original Drive player returned a provider loading error during inspection; no bypass or alternate stream is used.
- Reduced-motion preferences default to a static layout. Visitors can explicitly toggle motion in the footer; the choice lasts for this page session.
- The mobile menu, project buttons, toolkit disclosures, and dialogs are keyboard accessible. Native page scrolling remains available throughout.

## Design files

- `src/App.jsx`: page sections and interaction state
- `src/App.css`: responsive layouts, transitions, and motion treatment
- `src/hooks/useSequence.js`: reveal observer and frame-scheduled scroll effects
- `src/components/VideoPlayer.jsx`: on-demand embedded player
- `src/components/ProjectImage.jsx`: responsive remote thumbnails and fallback
- `public/fonts/`: self-hosted Inter with its license

Compatible dependency maintenance updates are recorded in the lockfile. No new production dependencies were added.
