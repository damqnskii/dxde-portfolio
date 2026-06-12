import type { Metadata } from "next";
import { Boxes, Gem } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import type { ProjectCollection } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects | Stoyan Stoyanov",
  description:
    "Level design projects and commissions from Stoyan Stoyanov's Behance portfolio.",
};

const projectSections: {
  collection: ProjectCollection;
  title: string;
  description: string;
}[] = [
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
  {
    collection: "commission",
    title: "Commissions",
    description:
      "Bespoke builds and environments created in collaboration with clients and creators.",
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
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
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
          <div className="flex items-center gap-4 border border-violet-400/20 bg-violet-500/[0.06] px-5 py-4">
            <Boxes className="size-7 text-[#bd68ff]" aria-hidden="true" />
            <div>
              <p className="font-mono text-2xl font-bold text-white">
                {projects.length}
              </p>
              <p className="text-xs uppercase text-[#8f889e]">Projects</p>
            </div>
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
