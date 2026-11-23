# Shannon — Video Editor portfolio

A static site: no build step. `index.html`, `styles.css`, `app.js`, and the video list in `projects.js`.

## Add a video

1. In Google Drive, share the video as "Anyone with the link can view".
2. Copy its id from the link: `https://drive.google.com/file/d/THIS_PART/view`.
3. In `projects.js`, add it as a new version of a project, or copy a whole project entry.
4. Run `sh thumbs.sh` to download its thumbnail into `thumbs/`.

## Preview

```
npx serve@14.2.4 -l 4321 .
```

## Deploy to Vercel

```
npx vercel@latest --prod
```

On the first run it asks you to log in and pick a project. Choose the existing
`video-editing-portfolio` project to replace the current site at the same address.
