"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden border border-violet-400/20 bg-[#0b0918] transition group-hover:border-violet-400/55 group-hover:shadow-[0_22px_55px_rgba(88,28,135,0.2)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#100b20]">
          <ProjectMedia
            src={project.coverImage}
            alt={`${project.title} cover image`}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0918] via-transparent to-transparent" />
          <p className="absolute left-5 top-5 border border-violet-400/30 bg-[#080713]/85 px-3 py-1.5 font-mono text-[10px] uppercase text-[#cd87ff]">
            {project.category}
          </p>
        </div>

        <div className="p-6">
          <p className="font-mono text-xs uppercase text-[#766f82]">
            {project.year}
          </p>
          <h2 className="mt-3 font-mono text-2xl font-semibold text-white">
            {project.title}
          </h2>
          <p className="mt-4 line-clamp-2 leading-7 text-[#a79fae]">
            {project.description}
          </p>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="border border-violet-400/15 bg-violet-500/[0.06] px-2.5 py-1 text-xs text-[#9e94aa]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ArrowRight
              className="size-5 shrink-0 text-[#bd68ff] transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
