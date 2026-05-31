# AGENTS.md

## Project overview

This repository contains a personal portfolio website for Damian Apostolov.

The site should be elegant, minimal, responsive and professional. It should present personal information, selected projects, all projects, individual project pages and a contact form.

Use the existing `PROJECT_PLAN.md` as the main architecture and implementation guide.

## Tech stack

Use the following stack unless explicitly instructed otherwise:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Resend for contact form emails
- Zod for validation
- Vercel for deployment

Do not add a database for the first version of the project.

## Architecture rules

- Use the `src/` directory.
- Use the Next.js App Router.
- Keep pages inside `src/app`.
- Keep reusable UI components inside `src/components`.
- Keep project data inside `src/data/projects.ts`.
- Keep profile/personal data inside `src/data/profile.ts`.
- Keep shared types inside `src/types`.
- Keep helper functions inside `src/lib`.
- Store images inside `public/projects`.
- Use one dynamic project page at `src/app/projects/[slug]/page.tsx`.
- Do not create separate static HTML files for individual projects.

## Data structure

Projects should be data-driven.

Each project should have a structure similar to:

```ts
type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  client?: string;
  coverImage: string;
  description: string;
  longDescription?: string;
  images: string[];
  tags: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
};
```

When adding a project:

1. Add its images under `public/projects/<project-slug>/`.
2. Add the project object in `src/data/projects.ts`.
3. Use the `slug` for the route `/projects/<slug>`.
4. Do not duplicate page templates.

## Design rules

The design should feel premium, elegant and clean.

Follow these visual principles:

- minimal layout
- strong typography
- large whitespace
- responsive grid
- soft shadows
- rounded corners
- smooth hover states
- subtle animations
- high-quality project imagery
- neutral color palette
- good contrast
- mobile-first responsiveness

Avoid:

- cluttered layouts
- too many colors
- heavy gradients
- random animations
- inconsistent spacing
- inline styles when Tailwind can be used

## Component rules

Prefer small reusable components.

Recommended components:

- `Navbar`
- `Footer`
- `Hero`
- `ProjectCard`
- `ProjectGrid`
- `ProjectGallery`
- `AboutSection`
- `SkillsSection`
- `ContactForm`

Keep components focused. Do not put too much unrelated logic in a single component.

## Styling rules

- Use Tailwind CSS for styling.
- Do not use CSS modules unless there is a clear reason.
- Keep global styles minimal.
- Use responsive Tailwind classes such as `sm:`, `md:`, `lg:`, `xl:`.
- Use semantic HTML where possible.
- Make sure the site works well on mobile, tablet and desktop.

## Animation rules

Use Framer Motion only where it improves the user experience.

Good animation use cases:

- section fade-in
- project card hover
- image reveal
- subtle page transitions
- button hover feedback

Avoid excessive or distracting animations.

## Contact form rules

The contact form should send emails through Resend.

Do not store contact messages in a database for the first version.

Use:

- `src/app/api/contact/route.ts` for the API route
- `resend` for sending email
- `zod` for request validation
- `.env.local` for secrets

Required environment variables:

```env
RESEND_API_KEY=
CONTACT_EMAIL=
```

Never hardcode secrets in the codebase.

The contact form should include:

- name
- email
- message
- loading state
- success state
- error state

## SEO rules

Add useful metadata in `src/app/layout.tsx`.

The site should have:

- clear title
- clear description
- Open Graph metadata when possible
- meaningful alt text for images
- semantic headings

Project pages should have meaningful titles and descriptions where possible.

## Accessibility rules

Follow basic accessibility requirements:

- Use semantic HTML.
- Add `alt` text for images.
- Buttons must have readable text.
- Inputs must have labels or accessible names.
- Keep color contrast readable.
- Make interactive elements keyboard accessible.

## Code quality rules

- Use TypeScript types.
- Avoid `any` unless absolutely necessary.
- Keep code readable and maintainable.
- Prefer named exports for components.
- Avoid duplicated code.
- Remove unused imports.
- Do not leave console logs in final code.
- Run linting before finalizing changes.

## Commands

Use these commands when working on the project:

```bash
npm run dev
npm run lint
npm run build
```

Before considering a task complete, run:

```bash
npm run lint
npm run build
```

If a command fails, explain the error and fix it when possible.

## Git rules

Make changes in small logical steps.

Use clear commit messages such as:

```bash
feat: add project grid
feat: add contact form
fix: improve mobile navigation
style: refine project card spacing
```

Do not commit `.env.local`.

## Implementation order

Follow this order unless the user asks otherwise:

1. Create or verify Next.js project setup.
2. Set up folder structure.
3. Add profile and project data files.
4. Build layout, navbar and footer.
5. Build hero section.
6. Build project card and project grid.
7. Build all projects page.
8. Build dynamic project detail page.
9. Build about and skills sections.
10. Build contact form.
11. Add API route for Resend.
12. Add responsive styling.
13. Add animations.
14. Add SEO metadata.
15. Run lint and build.
16. Prepare for deployment.

## Important constraints

- Do not add a database unless explicitly requested.
- Do not add authentication unless explicitly requested.
- Do not add an admin panel unless explicitly requested.
- Do not change the chosen tech stack unless there is a strong reason.
- Do not overcomplicate the first version.
- Keep the portfolio easy to maintain.

## Expected final result

The final site should be:

- fast
- elegant
- responsive
- easy to update
- easy to deploy
- project-data driven
- suitable for a professional personal portfolio
