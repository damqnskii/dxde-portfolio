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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8"
    >
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

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.08,
            },
          },
        }}
        className="grid gap-8 md:grid-cols-2"
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
