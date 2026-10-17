# Café QR Review Template

A small Vite + React landing page for cafés that want to turn a QR scan into a friendly Google review flow. Visitors can choose a suggested review, write their own, copy it, and continue to the café's Google review page.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

From the project directory:

```bash
npm install
npm run dev
```

Vite will print a local URL, normally `http://localhost:5173`. Open that URL on the development machine. Press `Ctrl+C` in the terminal to stop the server.

Create a production build with:

```bash
npm run build
```

The type-check and Vite build must both succeed. The deployable files are written to `dist/`. To preview that build locally, run:

```bash
npm run preview
```

## Customize the café

All café-specific content is in [`src/config/cafeConfig.ts`](src/config/cafeConfig.ts). Edit that file before deploying; no component changes are needed for normal branding and content updates.

### Brand, colors, and contact details

Update these fields in `cafeConfig`:

- `cafeName`, `tagline`, and `welcomeMessage` — the customer-facing brand copy.
- `primaryColor`, `secondaryColor`, `backgroundColor`, and `textColor` — the café color palette.
- `address`, `contactInfo`, and `hours` — optional footer details.
- `heroKicker`, `heroStamp`, `reviewHeading`, `reviewSubheading`, and `footerText` — supporting copy without editing components.
- `googleReviewUrl` — the café's direct Google review page URL.

Example local image values:

```ts
logoImage: '/images/cafe-logo.png',
bannerImage: '/images/cafe-banner.jpg',
```

### Replace image assets

The starter config intentionally leaves `logoImage` and `bannerImage` empty, so the site uses built-in fallbacks without broken image icons. To use café-owned images:

1. Create `public/images/`.
2. Add the replacement files, for example `public/images/cafe-banner.jpg` and `public/images/cafe-logo.png`.
3. Set `logoImage` and/or `bannerImage` to `/images/...` paths in `src/config/cafeConfig.ts`.
4. Run `npm run dev` to check the crop and readability of the text overlay, then run `npm run build` before deploying.

Files in `public/` are copied to the root of the built site, so `/images/cafe-banner.jpg` is the correct browser path. Keep filenames lowercase and URL-friendly, and prefer compressed JPG, PNG, or WebP files sized for the hero rather than uploading very large originals.

### Configure social links

Set `instagramUrl` and `whatsappUrl` to the café's real profiles. `facebookUrl` and `cafeWebsiteUrl` are optional: leave them as empty strings to hide those controls. Use complete `https://` URLs, including a full WhatsApp `https://wa.me/<country-code-and-number>` link. The app only allows `http` and `https` external URLs; a placeholder or invalid URL displays a clear configuration message instead of navigating.

Button text is centralized in `buttonLabels`, so you can rebrand calls to action without editing React components.

### Configure review presets

The `reviewPresets` array supplies the suggested review cards. Each preset needs:

- `id` — a unique stable identifier, such as `coffee` or `service`.
- `message` — the text copied for the visitor.
- `rating` — an integer from 1 to 5 used for the displayed stars.
- `label` — the short label above the suggestion.

Keep the messages natural and specific to the café. The template starts with exactly five presets; edit those five objects in the config file. Presets are only starting points: customers should personalize them so public reviews represent genuine experiences. The app does not condition access to Google Reviews on a positive rating.

### Set the Google review link

Replace the sample `googleReviewUrl` with the café's actual Google Business Profile review URL. A direct “write a review” link is preferable to a general search-results link. Test it in a private browser window before printing the QR code, and confirm that it opens the intended listing.

## How the Google review and clipboard flow works

When a visitor clicks **Copy & Post** on a preset, the app:

1. Copies the text to the clipboard using the browser Clipboard API.
2. Falls back to a temporary text area and the browser's legacy copy command when the modern API is unavailable.
3. Opens `cafeConfig.googleReviewUrl` in a new tab only after copying succeeds.
4. Shows a “Copied!” state briefly on the selected card and a confirmation toast.

The Google page does not receive the text automatically. The visitor pastes the copied text into Google's review form. If the browser blocks the new tab, use **Open Google Reviews** below the cards. If copying is denied, the app displays the selected message in a selectable text box with **Copy Again**.

For the most reliable clipboard behavior, serve the site over HTTPS in production. Browsers commonly restrict clipboard access on insecure origins; `localhost` is treated as secure during local development. The visitor must also allow the browser action when prompted.

The **Write My Own Review** action opens the same configured Google review URL without pretending to prefill a review. Customers can write and submit their own genuine experience directly in Google.

## Deploy

This is a static Vite site. There are no runtime API keys or environment variables required by the current implementation.

### Vercel

#### Dashboard

1. Push the project to a Git provider, then choose **Add New → Project** in Vercel.
2. Import the repository.
3. Keep the detected framework as **Vite** (or set it manually).
4. Use these build settings:
   - **Install command:** `npm install` (Vercel may use its equivalent automatically)
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Deploy, then test the generated URL on a phone and scan the QR destination.

#### CLI

From the project directory, after installing and authenticating the Vercel CLI:

```bash
vercel
vercel --prod
```

Vercel can detect the Vite settings; confirm that the production output directory is `dist` if prompted.

### Netlify

#### Dashboard

1. Push the project to a Git provider and choose **Add new site → Import an existing project** in Netlify.
2. Select the repository.
3. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy the site.

#### CLI

After installing and authenticating the Netlify CLI, initialize the site from the project directory and deploy the built output:

```bash
npm run build
netlify deploy --prod --dir=dist
```

The site uses in-page anchors rather than client-side routes, so no SPA rewrite rule is needed for the current page. If routes are added later, configure the hosting provider's fallback behavior for them.

## Project layout

```text
src/
  config/cafeConfig.ts   Café details, links, hero image, and review presets
  components/            Hero actions, review cards, and footer
  lib/external.ts        URL validation, clipboard, and external-window helpers
  styles.css             Layout and visual styling
public/images/           Optional local images (create this directory when needed)
dist/                    Generated by npm run build; do not edit by hand
```

## Git hygiene

The included `.gitignore` excludes installed dependencies, generated build output, local environment files, editor settings, and operating-system clutter. Commit `package-lock.json` so deployments use the tested dependency tree.
