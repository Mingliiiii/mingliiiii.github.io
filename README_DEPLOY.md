# Mingli Sun academic homepage — GitHub Pages package

This folder is a complete static website for `https://mingliiiii.github.io/`. It does not require Node.js, npm, a build command, or a server-side runtime.

## Deploy to the original URL

1. Open the repository that publishes `mingliiiii.github.io` and make a backup of its current contents.
2. Delete the existing site files from the repository root. In particular, delete any old `CNAME` file: the `mingliiiii.github.io` address does not need one.
3. Copy **all files and folders inside this package** into the repository root. Keep `.nojekyll`.
4. Commit and push the changes to the `main` branch.
5. In GitHub, open **Settings → Pages** and select **Deploy from a branch**, then choose **main** and **/(root)**.
6. After GitHub Pages finishes deploying, open `https://mingliiiii.github.io/` and hard-refresh once.

## Package contents

- `index.html` — page structure and all academic content
- `stylesheet.css` — responsive layout, dark mode, and star animations
- `site.js` — theme switcher plus desktop mouse and mobile touch star trails
- `images/` and `fonts/` — local assets; no third-party asset CDN required
- `Mingli_Sun_CV.pdf` — downloadable CV
- `.nojekyll`, `robots.txt`, and `sitemap.xml` — GitHub Pages and search-engine support

To preview locally, double-click `index.html`, or run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.
