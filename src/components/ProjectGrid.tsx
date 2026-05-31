import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  title?: string;
  description?: string;
};

export function ProjectGrid({ projects, title, description }: ProjectGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      {(title || description) && (
        <div className="mb-10 max-w-2xl">
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 leading-7 text-neutral-600">{description}</p>
          )}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
