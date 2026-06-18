import type { Metadata } from "next";
import { Gem } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import type { ProjectCollection } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects | Stoyan Stoyanov",
  description:
    "Level design projects and commissions from Stoyan Stoyanov's portfolio.",
};

const projectSections: {
  collection: ProjectCollection;
  title: string;
  description: string;
}[] = [
  {
    collection: "commission",
    title: "Commissions",
    description:
      "Bespoke builds and environments created in collaboration with clients and creators.",
  },
  {
    collection: "personal",
    title: "Personal Projects",
    description:
      "Original worlds and environment concepts developed as personal creative explorations.",
  },
  {
    collection: "marketplace",
    title: "Marketplace Projects",
    description:
      "Polished Minecraft experiences designed for marketplace audiences and production requirements.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <MotionSection className="mx-auto max-w-[1500px] border border-violet-400/20 bg-[#0a0816]/92 px-6 py-10 sm:px-10 lg:py-14">
        <div className="flex items-center gap-3 font-mono text-xs uppercase text-[#bd68ff]">
          <Gem className="size-4" aria-hidden="true" />
          Project archive
        </div>
        <div className="mt-6">
          <div>
            <h1 className="max-w-4xl font-mono text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Minecraft worlds, commissions and{" "}
              <span className="text-[#b45cff]">environment concepts.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#aaa3b8]">
              A growing archive of level design work focused on readable
              gameplay, atmosphere and memorable world building.
            </p>
          </div>
        </div>
      </MotionSection>

      {projectSections.map((section) => (
        <ProjectGrid
          key={section.collection}
          projects={projects.filter(
            (project) => project.collection === section.collection,
          )}
          title={section.title}
          description={section.description}
        />
      ))}
    </main>
  );
}
