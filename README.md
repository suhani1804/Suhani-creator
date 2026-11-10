# Suhani Mohanty: creator site

Plain HTML/CSS/JS. No build step, no frameworks.

## Deploy on GitHub Pages
1. Create a free account at github.com, then **New repository**. Name it `YOURUSERNAME.github.io` (site lives at that address) or any name (site lives at `YOURUSERNAME.github.io/NAME`). Set it to Public.
2. On the repo page choose **Add file > Upload files**, drag in everything inside this folder (`index.html`, `mediakit.html`, `css`, `js`, `images`; `originals` is optional and can stay off), then **Commit changes**.
3. Go to **Settings > Pages**. Under Source choose **Deploy from a branch**, branch `main`, folder `/ (root)`, Save. After about a minute your URL appears there.
4. Replace `YOUR-USERNAME` and `REPO` in the `canonical` and `og:` tags near the top of `index.html` with your real address, so link previews show your image.

## Update content (no rebuild)
Edit `js/content.js` on GitHub (pencil icon): stats, audience insights, portfolio items, Reel links, email, form endpoint. Add a new photo to `images/` as `name-lg.jpg` (about 1800px wide) and `name-sm.jpg` (about 800px), then add an entry to `portfolio`.

## Make the form send directly
Sign up free at formspree.io, create a form, paste its URL into `formEndpoint` in `content.js`. Until then the form opens the visitor's email app pre-filled (it works, but it is not a hosted form).

## Still needed from you
- Audience analytics from Instagram Insights (countries, cities, age, gender, engagement rate, reach, accounts engaged); paste into `insights`.
- Your Reel links (and 3 to 5 best Reels chosen), plus any real brand work or testimonials.
- A branded email address (e.g. hello@yourname) instead of Gmail, if you can.
- Confirm place names for photos if you want them captioned (I kept titles generic).
- Formspree endpoint; GitHub Pages address for the metadata.
- Video: short screen-recorded or exported Reel clips would strengthen the portfolio a lot.
- Optional: a face-free "product detail" shots set (luggage, gadgets, accessories) since that is a target category.
