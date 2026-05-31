import { Hero } from "@/components/Hero";
import { HomeFeaturedWork } from "@/components/HomeFeaturedWork";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main>
      <Hero />

      <HomeFeaturedWork projects={featuredProjects} />
    </main>
  );
}
