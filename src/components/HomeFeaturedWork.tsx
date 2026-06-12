"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gem } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import type { Project } from "@/types/project";

type HomeFeaturedWorkProps = {
  projects: Project[];
};

export function HomeFeaturedWork({ projects }: HomeFeaturedWorkProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mt-5 border border-violet-400/20 bg-[#090714]/90 p-5 sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-mono text-base font-semibold uppercase text-white">
          <Gem className="size-4 text-[#bd68ff]" aria-hidden="true" />
          Featured projects
        </h2>
        <Link
          href="/projects"
          className="hidden items-center gap-2 font-mono text-xs uppercase text-[#bd68ff] transition hover:text-white sm:inline-flex"
        >
          All projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden border border-violet-400/20 bg-[#0d0a1b] transition hover:-translate-y-1 hover:border-violet-400/55 hover:shadow-[0_18px_45px_rgba(88,28,135,0.22)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <ProjectMedia
                src={project.coverImage}
                alt={`${project.title} cover image`}
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1b] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 border border-violet-400/30 bg-[#0a0716]/85 px-2.5 py-1 font-mono text-[10px] uppercase text-[#ce8cff]">
                {project.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-mono text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9f97ab]">
                {project.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase text-[#bd68ff]">
                View project
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
