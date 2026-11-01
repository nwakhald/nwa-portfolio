# Nwa Khalid Kareem — React Portfolio

A complete React + Vite portfolio, ready to upload to your own GitHub repository.

Includes BritishLightUp, Online NCC, Decor Planet Supply, Digital Marketing, 17 graphic-design redesigns, salary expectations and contact details. Images are included locally; no API keys or database are required.

## Run on your computer

Install Node.js 24 LTS and extract this ZIP. Open a terminal inside the folder containing `package.json`, then run:

```bash
npm ci
npm run dev
```

Open the local address printed in the terminal.

## Publish using GitHub Pages

1. Create a new GitHub repository named, for example, `nwa-portfolio`. For a straightforward free Pages setup, make it public.
2. Upload the **contents** of this extracted folder to the repository root. `package.json` must be at the root. Include the `.github/workflows/deploy.yml` file; it may be hidden in your file manager. Upload the files, not the ZIP.
3. Use `main` as the branch name.
4. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
5. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**, select `main`, then run it. The workflow also runs when you push future changes to `main`.
6. When deployment succeeds, open the website URL shown under **Settings → Pages** or in the workflow's deployment summary.

For a repository named `nwa-portfolio`, the usual address is:

```text
https://YOUR-USERNAME.github.io/nwa-portfolio/
```

If an initial workflow ran before Pages was enabled and failed, enable Pages as described above and run the workflow again.

### Upload with Git instead

Create an empty GitHub repository first, without adding a README or other files. From this extracted folder:

```bash
git init
git add .
git commit -m "Add React portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nwa-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` and the repository name with your own values. Then enable GitHub Pages using the steps above.

The Vite configuration uses relative asset paths, so this single-page portfolio works under a repository subfolder or at the root of a custom domain. No username or repository name needs to be hard-coded in the source.

## Edit your portfolio

| File or folder | What to edit |
| --- | --- |
| `src/data/portfolio.json` | Name, title, contact information, project descriptions and salary |
| `src/data/designs.json` | Graphic-design titles, categories, captions and image paths |
| `src/data/screenshots.js` | BritishLightUp and Online NCC screenshot descriptions |
| `src/data/images.json` | Screenshot sizes and responsive image variants |
| `src/components/Projects.jsx` | Project layouts and feature descriptions |
| `src/components/Marketing.jsx` | Digital Marketing section and gallery |
| `src/components/Sections.jsx` | Header, introduction, approach, salary and contact sections |
| `src/styles/` | Colours, layout, mobile styles and print styles |
| `public/assets/` | Local screenshots and optimized images |
| `index.html` | Default browser title and search description |

After editing, commit and push the changes to `main`. GitHub Actions rebuilds the public website.

The first three project entries correspond to BritishLightUp, Online NCC and Decor Planet Supply. Keep their order when editing the JSON; they have dedicated layouts. Additional entries use a simple project card.

### The “Edit portfolio” button

This button saves a personal copy in the current browser only. It is useful for preparing a tailored print/PDF copy. It does **not** change the website for other visitors and does not save changes to GitHub.

To publish changes for everyone, edit the source files above and push them. If you previously used the browser editor, select **Restore website details** to see the latest source version.

### Images and project context

- All 17 graphic-design examples are labelled as portfolio redesigns.
- Artwork is provided as optimized WebP images with responsive previews and full-resolution versions.
- Screenshot images are supplied locally, with responsive previews. The Online NCC account phone number is hidden in the included image.
- The portfolio describes AI and MERN features in the BritishLightUp project. This download is the portfolio frontend; it does not contain the BritishLightUp shop backend, customer data, payment system or AI credentials.
- The Google search screenshot is an example supplied for the portfolio, not a claim about current search rankings.

## Build and check

```bash
npm test
npm run build
npm run preview
```

`npm test` checks image references, repository-subpath URLs, gallery filters, image navigation, screenshot tabs, editor persistence, salary validation and print behaviour in a simulated browser DOM.

`npm run build` generates the production website in `dist/`. `npm run preview` lets you inspect that build locally.

The ZIP excludes `node_modules/`, temporary test output and `dist/`. They are generated by the commands above. The lockfile is included so the same dependencies can be installed using `npm ci`.

## Deployment references

- [Vite static deployment and GitHub Pages](https://vite.dev/guide/static-deploy.html)
- [Vite relative base paths](https://vite.dev/guide/build.html#relative-base)
- [GitHub Pages documentation](https://docs.github.com/en/pages)

The included workflow uses the pinned GitHub Actions revisions shown in the Vite deployment guide at export time.
