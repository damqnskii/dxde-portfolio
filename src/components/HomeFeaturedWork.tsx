"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

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
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.42em] text-neutral-500">
            Featured Work
          </p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            Some of my recent projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-4 text-sm font-medium text-neutral-950 underline underline-offset-4 transition hover:-translate-y-0.5"
        >
          View all projects
          <ArrowUpRight
            className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
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
        {featuredProjects.map((project, index) => (
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
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-xl border border-white/80 bg-white/82 shadow-[0_22px_70px_rgba(23,23,23,0.08)] backdrop-blur transition group-hover:shadow-[0_30px_90px_rgba(23,23,23,0.12)]"
              >
                <div className="relative aspect-[1.55] overflow-hidden bg-neutral-100">
                  <div className="absolute inset-0 bg-[linear-gradient(155deg,#f6f6f3_0%,#e6e6e2_48%,#ffffff_100%)]" />
                  <div
                    className={`absolute inset-x-8 top-10 h-40 rounded-lg border border-white/80 bg-white/70 shadow-[0_28px_70px_rgba(23,23,23,0.12)] transition duration-700 group-hover:-translate-y-2 ${
                      index === 1 ? "-rotate-3" : index === 2 ? "rotate-2" : "-rotate-6"
                    }`}
                  >
                    <div className="flex h-8 items-center gap-2 border-b border-neutral-200/70 px-4">
                      <span className="size-1.5 rounded-full bg-neutral-300" />
                      <span className="size-1.5 rounded-full bg-neutral-300" />
                      <span className="size-1.5 rounded-full bg-neutral-300" />
                    </div>
                    <div className="grid h-[calc(100%-2rem)] grid-cols-[0.55fr_1fr] gap-3 p-4">
                      <div className="rounded-md bg-neutral-950/85" />
                      <div className="space-y-3">
                        <div className="h-3 w-3/4 rounded-full bg-neutral-300" />
                        <div className="h-3 w-1/2 rounded-full bg-neutral-200" />
                        <div className="mt-5 h-16 rounded-md bg-neutral-200/80" />
                      </div>
                    </div>
                  </div>
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
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition group-hover:border-neutral-300 group-hover:text-neutral-950">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
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
