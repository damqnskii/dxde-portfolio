import { Hero } from "@/components/Hero";
import { HomeFeaturedWork } from "@/components/HomeFeaturedWork";
import { HomeSidebar } from "@/components/HomeSidebar";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main className="px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <Hero />
          <HomeFeaturedWork projects={featuredProjects} />
        </div>
        <HomeSidebar />
      </div>
    </main>
  );
}
