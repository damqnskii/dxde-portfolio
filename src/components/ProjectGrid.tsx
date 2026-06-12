"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  title?: string;
  description?: string;
};

export function ProjectGrid({ projects, title, description }: ProjectGridProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      {(title || description) && (
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-violet-400/20 pb-5">
          <div className="max-w-2xl">
          {title && (
            <h2 className="font-mono text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 leading-7 text-[#aaa3b8]">{description}</p>
          )}
          </div>
          <p className="shrink-0 font-mono text-sm uppercase text-[#bd68ff]">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      )}

      <motion.div
        initial={false}
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.08,
            },
          },
        }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
