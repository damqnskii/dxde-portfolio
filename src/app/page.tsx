import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main>
      <Hero />

      <ProjectGrid
        projects={featuredProjects}
        title="Selected Projects"
        description="Featured level design work from the Behance portfolio, including personal explorations, marketplace work, and commissions."
      />
    </main>
  );
}
