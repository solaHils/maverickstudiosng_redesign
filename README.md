# Maverick Studios NG: redesign

A rebuild of [maverickstudiosng.com](https://maverickstudiosng.com/), the site of a Nigeria-based 3D animation and VFX studio.

Built with React, TypeScript, Vite and Tailwind CSS v4.

## Run it

```bash
npm install
cp .env.example .env    # then put in your own contact details
npm run dev             # local dev server
npm run build           # production build in dist/
```

Contact details and form addresses are kept out of the repository. They come from `.env` and `public/send-enquiry.config.php`, both ignored by git.

## What's in it

- **Home:** a slider hero. The first slide is a video of the studio's robot character whose head follows the mouse. The other slides are banners and frames from the studio's work. Below it are the studio intro, selected work and a call to action.
- **Portfolio, About, Contact:** project cards linking to YouTube, the team, and an enquiry form.
- **Design system:** `DESIGN.md` (adapted from the Framer analysis in [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)) with the brand red `#fe1f00` as the single accent.

## Contact form

The form posts JSON to `public/send-enquiry.php`, which emails the enquiry. It needs a host that runs PHP (for example the shared hosting the live site uses). Copy `public/send-enquiry.config.example.php` to `public/send-enquiry.config.php` and set the recipient and sender addresses. Elsewhere, set `VITE_FORM_ENDPOINT` to a form service URL instead.

## Deploying

Upload the contents of `dist/` (including the hidden `.htaccess`) to the web root. `public/_redirects` does the same job for Netlify.
