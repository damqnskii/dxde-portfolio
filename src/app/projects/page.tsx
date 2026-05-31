import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Stoyan Stoyanov",
  description:
    "Level design projects and commissions from Stoyan Stoyanov's Behance portfolio.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-20 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
          Work
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
          Level design projects, commissions, and environment concepts.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          A data-driven archive based on the public Behance profile, ready to be
          paired with exported project imagery.
        </p>
      </section>

      <ProjectGrid projects={projects} />
    </main>
  );
}
