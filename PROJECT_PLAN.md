# PROJECT_PLAN.md

# Personal Portfolio Website — Architecture and Implementation Plan

## 1. Project Goal

Build an elegant, minimal, responsive and professional personal portfolio website.

The website should be inspired by modern portfolio and Behance-style project showcases, but with a cleaner structure, stronger visual hierarchy, better navigation and dedicated project detail pages.

The first version should be simple, fast and easy to maintain. It should not use a database.

---

## 2. Core Requirements

The website must include:

- Home page
- Hero section
- Selected projects section
- All projects page
- Individual project detail pages
- About section
- Skills / Technologies section
- Contact section with form
- Footer with social links

The project should be data-driven. Projects should be stored in a TypeScript file and rendered dynamically.

---

## 3. Recommended Tech Stack

Use the following stack:

```txt
Next.js
TypeScript
Tailwind CSS
Framer Motion
Lucide React
Resend
Zod
Vercel
```

### Why this stack?

#### Next.js

Use Next.js because it provides:

- App Router
- file-based routing
- dynamic routes
- image optimization
- good SEO support
- easy deployment to Vercel
- excellent developer experience

Project detail pages should use a dynamic route:

```txt
/projects/[slug]
```

This avoids manually creating separate HTML files for every project.

#### TypeScript

Use TypeScript to keep the codebase safer, cleaner and easier to maintain.

Project data should have a defined type, so every project follows the same structure.

#### Tailwind CSS

Use Tailwind CSS for styling.

It should handle:

- layout
- spacing
- typography
- colors
- responsive design
- hover states
- cards
- buttons
- grids

#### Framer Motion

Use Framer Motion for subtle and polished animations.

Use it only where it improves the user experience.

#### Resend

Use Resend for the contact form.

The contact form should send messages directly to email and should not store messages in a database.

#### Zod

Use Zod to validate contact form requests on the server.

#### Vercel

Use Vercel for deployment.

---

## 4. Database Decision

Do not add a database for the first version.

Projects should be stored in:

```txt
src/data/projects.ts
```

Profile data should be stored in:

```txt
src/data/profile.ts
```

This is the best approach for the first version because:

- the site is easier to build
- there is less complexity
- deployment is simpler
- there is no need for authentication
- there is no need for an admin panel
- the portfolio stays fast and maintainable

### Add a database only if needed later

A database or CMS may be added later if the project needs:

- admin panel
- login system
- blog
- editing projects without code
- storing contact messages
- analytics dashboard
- CMS workflow

Possible future options:

```txt
Supabase
Sanity
Payload CMS
Strapi
PostgreSQL
```

---

## 5. Project Setup

### 5.1 Check Node.js and npm

Run:

```bash
node -v
npm -v
```

If both commands return versions, continue.

---

### 5.2 Create the Next.js project

Run:

```bash
npx create-next-app@latest portfolio
```

Recommended setup answers:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src/ directory: Yes
App Router: Yes
Turbopack: Yes
Import alias customization: No
```

Then run:

```bash
cd portfolio
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 6. Install Dependencies

Run:

```bash
npm install framer-motion lucide-react resend zod
```

Dependencies:

```txt
framer-motion  -> animations
lucide-react   -> icons
resend         -> email sending
zod            -> validation
```

---

## 7. Recommended Folder Structure

```txt
portfolio/
├─ public/
│  ├─ projects/
│  │  ├─ project-one/
│  │  │  ├─ cover.jpg
│  │  │  ├─ 01.jpg
│  │  │  └─ 02.jpg
│  │  └─ project-two/
│  │     ├─ cover.jpg
│  │     ├─ 01.jpg
│  │     └─ 02.jpg
│  └─ avatar.jpg
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  │
│  │  ├─ projects/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  │  │
│  │  └─ api/
│  │     └─ contact/
│  │        └─ route.ts
│  │
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ ProjectCard.tsx
│  │  ├─ ProjectGrid.tsx
│  │  ├─ ProjectGallery.tsx
│  │  ├─ AboutSection.tsx
│  │  ├─ SkillsSection.tsx
│  │  └─ ContactForm.tsx
│  │
│  ├─ data/
│  │  ├─ profile.ts
│  │  └─ projects.ts
│  │
│  ├─ lib/
│  │  ├─ utils.ts
│  │  └─ validations.ts
│  │
│  └─ types/
│     └─ project.ts
│
├─ AGENTS.md
├─ PROJECT_PLAN.md
├─ .env.local
├─ .gitignore
├─ package.json
└─ README.md
```

---

## 8. Profile Data

Create:

```txt
src/data/profile.ts
```

Example:

```ts
export const profile = {
  name: "Damian Apostolov",
  role: "Full Stack Developer",
  location: "Bulgaria",
  shortIntro:
    "I build modern web applications with clean architecture, elegant design and smooth user experience.",
  email: "your-email@example.com",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    behance: "https://behance.net/your-username"
  }
};
```

Rules:

- Keep personal information in this file.
- Do not hardcode profile data across components.
- Components should import and use this data.

---

## 9. Project Type

Create:

```txt
src/types/project.ts
```

```ts
export type Project = {
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

---

## 10. Project Data

Create:

```txt
src/data/projects.ts
```

Example:

```ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    subtitle: "Online store with cart, orders and payments",
    category: "Full Stack Development",
    year: "2026",
    coverImage: "/projects/ecommerce-platform/cover.jpg",
    description:
      "A modern e-commerce platform with product filtering, cart, checkout and admin management.",
    longDescription:
      "This project focuses on clean architecture, secure authentication, payment integration and responsive user experience.",
    images: [
      "/projects/ecommerce-platform/01.jpg",
      "/projects/ecommerce-platform/02.jpg",
      "/projects/ecommerce-platform/03.jpg"
    ],
    tags: ["Next.js", "Spring Boot", "PostgreSQL", "Stripe"],
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project"
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Elegant personal portfolio",
    category: "Web Design",
    year: "2026",
    coverImage: "/projects/portfolio-website/cover.jpg",
    description:
      "A minimal and elegant portfolio website with project pages and a contact form.",
    images: [
      "/projects/portfolio-website/01.jpg",
      "/projects/portfolio-website/02.jpg"
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    featured: true
  }
];
```

Rules:

- Every project must have a unique `slug`.
- The `slug` becomes the project URL.
- Store images in `public/projects/<slug>/`.
- Do not create separate static pages for each project.

---

## 11. Main Pages

### 11.1 Home Page

File:

```txt
src/app/page.tsx
```

The home page should include:

```txt
Hero
Selected Projects
About
Skills
Contact
```

Example:

```tsx
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactForm } from "@/components/ContactForm";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main>
      <Hero />
      <ProjectGrid projects={featuredProjects} title="Selected Projects" />
      <AboutSection />
      <SkillsSection />
      <ContactForm />
    </main>
  );
}
```

---

### 11.2 All Projects Page

File:

```txt
src/app/projects/page.tsx
```

Example:

```tsx
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-2xl text-neutral-500">
          A selection of work across web development, design and digital products.
        </p>
      </section>

      <ProjectGrid projects={projects} />
    </main>
  );
}
```

---

### 11.3 Dynamic Project Detail Page

File:

```txt
src/app/projects/[slug]/page.tsx
```

Example:

```tsx
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        {project.category} / {project.year}
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        {project.title}
      </h1>

      {project.subtitle && (
        <p className="mt-4 text-xl text-neutral-500">{project.subtitle}</p>
      )}

      <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600">
        {project.longDescription ?? project.description}
      </p>

      <ProjectGallery images={project.images} title={project.title} />
    </main>
  );
}
```

---

## 12. Components

### 12.1 ProjectCard

File:

```txt
src/components/ProjectCard.tsx
```

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-sm uppercase tracking-widest text-neutral-400">
          {project.category} / {project.year}
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-3 text-neutral-500">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
```

---

### 12.2 ProjectGrid

File:

```txt
src/components/ProjectGrid.tsx
```

```tsx
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  title?: string;
};

export function ProjectGrid({ projects, title }: ProjectGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {title && (
        <h2 className="mb-10 text-3xl font-semibold tracking-tight">{title}</h2>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

---

## 13. Contact Form

The contact form should not use a database in the first version.

Flow:

```txt
User submits form
↓
Next.js API route
↓
Resend
↓
Message is delivered to email
```

---

## 14. Environment Variables

Create:

```txt
.env.local
```

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-email@example.com
```

Rules:

- Never commit `.env.local`.
- Never hardcode API keys.
- Use environment variables for secrets.

---

## 15. Contact API Route

File:

```txt
src/app/api/contact/route.ts
```

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New portfolio message from ${data.name}`,
      replyTo: data.email,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
```

---

## 16. ContactForm Component

File:

```txt
src/components/ContactForm.tsx
```

```tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
        Contact
      </p>

      <h2 className="mt-4 text-4xl font-semibold tracking-tight">
        Let’s build something beautiful.
      </h2>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none transition focus:border-neutral-900"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none transition focus:border-neutral-900"
        />

        <textarea
          name="message"
          required
          placeholder="Tell me about your project"
          rows={6}
          className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none transition focus:border-neutral-900"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-neutral-950 px-8 py-4 text-white transition hover:bg-neutral-700 disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-sm text-green-600">Message sent successfully.</p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
```

---

## 17. Design Direction

The visual style should be:

```txt
minimal
elegant
premium
clean
modern
spacious
professional
```

Recommended visual principles:

- strong typography
- generous whitespace
- large project images
- neutral colors
- soft shadows
- rounded cards
- subtle borders
- smooth hover effects
- polished responsive layout

Recommended color direction:

```txt
background: #fafafa
text: #111111
muted text: #737373
cards: #ffffff
border: #e5e5e5
accent: black / dark gray / soft neutral gradient
```

Avoid:

- too many colors
- cluttered layouts
- heavy gradients
- excessive animations
- inconsistent spacing
- overly complex UI

---

## 18. Responsive Design

The website must work well on:

```txt
mobile
tablet
laptop
desktop
```

Layout principle:

```txt
mobile  -> 1 column project grid
desktop -> 2 column project grid
```

Example:

```tsx
<div className="grid gap-8 md:grid-cols-2">
  ...
</div>
```

---

## 19. SEO Requirements

Add metadata in:

```txt
src/app/layout.tsx
```

Example:

```tsx
export const metadata = {
  title: "Damian Apostolov — Portfolio",
  description:
    "Portfolio of Damian Apostolov, focused on web development, design and digital products.",
};
```

Recommended SEO features:

- page title
- page description
- Open Graph metadata
- meaningful image alt text
- semantic headings
- clean URLs

Project pages can later include dynamic metadata.

---

## 20. Accessibility Requirements

The website should follow basic accessibility practices:

- Use semantic HTML.
- Add alt text to all meaningful images.
- Use readable color contrast.
- Inputs should have labels or accessible names.
- Buttons should have clear text.
- Interactive elements should be keyboard accessible.
- Do not rely only on color to communicate state.

---

## 21. Deployment

Use Vercel.

Deployment steps:

1. Push the project to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Add environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
5. Deploy.

---

## 22. Git Workflow

Initial setup:

```bash
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

Suggested commit messages:

```bash
feat: add project data structure
feat: add hero section
feat: add project grid
feat: add project detail page
feat: add contact form
fix: improve mobile navigation
style: refine project card spacing
```

---

## 23. Implementation Roadmap

### Phase 1 — Setup

- Create Next.js project.
- Install dependencies.
- Configure project structure.
- Set up global styles.
- Create base layout.

### Phase 2 — Data

- Add `profile.ts`.
- Add `projects.ts`.
- Add project types.
- Add initial project examples.

### Phase 3 — Core UI

- Create Navbar.
- Create Footer.
- Create Hero.
- Create ProjectCard.
- Create ProjectGrid.
- Create AboutSection.
- Create SkillsSection.

### Phase 4 — Project Pages

- Create `/projects` page.
- Create `/projects/[slug]` page.
- Create ProjectGallery.
- Add project links and tags.
- Handle missing projects with `notFound()`.

### Phase 5 — Contact

- Create ContactForm.
- Create contact API route.
- Add Resend integration.
- Add Zod validation.
- Add loading, success and error states.

### Phase 6 — Polish

- Add animations.
- Improve responsive design.
- Add metadata.
- Optimize images.
- Review accessibility.
- Run lint and build.

### Phase 7 — Deployment

- Push to GitHub.
- Deploy to Vercel.
- Add environment variables.
- Test production build.
- Connect custom domain if needed.

---

## 24. How to Add a New Project

1. Create a folder:

```txt
public/projects/new-project/
```

2. Add images:

```txt
cover.jpg
01.jpg
02.jpg
03.jpg
```

3. Add a new object in:

```txt
src/data/projects.ts
```

Example:

```ts
{
  slug: "new-project",
  title: "New Project",
  category: "Web Development",
  year: "2026",
  coverImage: "/projects/new-project/cover.jpg",
  description: "Short project description.",
  images: [
    "/projects/new-project/01.jpg",
    "/projects/new-project/02.jpg"
  ],
  tags: ["Next.js", "Tailwind CSS"],
  featured: false
}
```

4. The project will automatically appear on the website.

---

## 25. Quality Checklist

Before completing the project, verify:

- `npm run lint` passes
- `npm run build` passes
- all pages are responsive
- all project links work
- all images load correctly
- contact form works
- environment variables are configured
- no secrets are committed
- metadata is set
- layout works on mobile
- there are no unused imports
- there are no unnecessary console logs

---

## 26. Final Recommendation

The first version should remain simple:

```txt
Next.js + TypeScript + Tailwind CSS
projects.ts for project data
Resend for contact form
No database
Deploy on Vercel
```

This architecture is professional, scalable enough for a personal portfolio, easy to maintain and easy to extend later with a CMS or database if needed.
