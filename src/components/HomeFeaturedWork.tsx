"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { MoveRight } from "lucide-react";

type HomeFeaturedWorkProps = {
  projects: Project[];
};

export function HomeFeaturedWork({ projects }: HomeFeaturedWorkProps) {
  const featuredProjects = projects.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 lg:px-10"
    >
      <div className="mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.42em] text-neutral-500">
          Featured Work
        </p>
        <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-neutral-950 sm:text-4xl">
          Some of my recent projects
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-7 lg:grid-cols-3"
      >
        {featuredProjects.map((project) => (
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
            <Link href={`/projects/${project.slug}`} className="group block">
              <motion.article
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="overflow-hidden rounded-xl border border-white/90 bg-white/90 shadow-[0_18px_45px_rgba(23,23,23,0.12),0_4px_14px_rgba(23,23,23,0.08)] backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(23,23,23,0.18),0_8px_22px_rgba(23,23,23,0.10)]"
              >
                <div className="relative aspect-[1.55] overflow-hidden bg-neutral-100">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} cover image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-opacity duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-85 transition-opacity duration-300 ease-out group-hover:opacity-95" />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-neutral-950">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500">
                      {project.category}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-neutral-500 transition group-hover:text-neutral-950">
                    View
                    <MoveRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
