# Portfolio — AI Automation & n8n VA

A **conversion-focused, single-page portfolio** for a **virtual assistant** who delivers **AI automation** and **n8n workflow** work. The site presents services, sample workflows, an about section, CTAs, and a contact path—styled as a modern SaaS landing page with clear hierarchy and subtle motion.

## What it does

- **Hero** — Headline, value proposition, and primary calls to action (projects + consultation).
- **Selected workflows** — Mock case studies (problem, solution, tools). Cards open a **modal** with **screenshots or video** demos (replace media in `src/data/projects.ts`).
- **Services** — AI email automation, lead gen, CRM workflows, and custom n8n builds.
- **About** — Positioning around reliability, learning, and passion for automation.
- **CTA + contact** — Closing message and a **contact form** backed by `POST /api/contact` (wire your email provider in `src/app/api/contact/route.ts`). Optional **Calendly** embed via env.
- **Navigation** — Sticky header with **scroll-spy** highlighting for the current section, plus a **back-to-top** control.
- **SEO** — Metadata, `sitemap.xml`, `robots.txt`, and JSON-LD for a professional service.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) · TypeScript · React 19  
- [Tailwind CSS](https://tailwindcss.com) v4  
- [shadcn/ui](https://ui.shadcn.com) (Base UI primitives)  
- [Framer Motion](https://www.framer.com/motion/) for light animations  

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Configuration

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (metadata, sitemap, robots) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown in footer and contact column |
| `NEXT_PUBLIC_CALENDLY_URL` | Full Calendly event URL (e.g. `https://calendly.com/name/event`); used for links and the official inline embed on the contact section |
| `CONTACT_TO` | Target inbox when you add email sending in the API route |

Branding and default copy live in `src/lib/site-config.ts`. Project stories and demo media live in `src/data/projects.ts`.

## Project layout (high level)

- `src/app/` — App Router pages, layout, API route (`api/contact`), SEO helpers  
- `src/components/` — Layout (header, footer, back-to-top), sections, UI, motion  
- `src/data/` — Services and projects mock data  
- `src/hooks/` — Scroll-spy for active nav  

---

Built to attract clients searching for **AI automation VA**, **n8n automation**, **workflow automation**, and **virtual assistant automation** services.
