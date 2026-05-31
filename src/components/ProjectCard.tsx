import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover image`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <p className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-950 backdrop-blur">
          {project.category}
        </p>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              {project.category} / {project.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-neutral-400 transition group-hover:text-neutral-950"
            aria-hidden="true"
          />
        </div>

        <p className="mt-4 leading-7 text-neutral-600">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-stone-100 px-3 py-1 text-sm text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
