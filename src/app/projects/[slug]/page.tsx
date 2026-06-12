import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Gem } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { MotionSection } from "@/components/MotionSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Stoyan Stoyanov`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <MotionSection className="border border-violet-400/20 bg-[#0a0816]/94 p-6 sm:p-10">
          <BackButton
            fallbackHref="/projects"
            label="Back to projects"
            className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase text-[#9f97ab] transition hover:text-[#ce8cff]"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <p className="flex items-center gap-3 font-mono text-xs uppercase text-[#bd68ff]">
                <Gem className="size-4" aria-hidden="true" />
                {project.category} / {project.year}
              </p>
              <h1 className="mt-5 max-w-4xl font-mono text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="mt-5 max-w-2xl text-xl text-[#c7bfce]">
                  {project.subtitle}
                </p>
              )}
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#aaa3b8]">
                {project.longDescription ?? project.description}
              </p>
            </div>

            <aside className="h-fit border border-violet-400/20 bg-[#0d0a1b] p-6">
              <h2 className="font-mono text-sm uppercase text-white">
                Project details
              </h2>
              <dl className="mt-6 grid gap-5 text-sm">
                <div className="border-b border-violet-400/10 pb-4">
                  <dt className="text-[#766f82]">Category</dt>
                  <dd className="mt-1 text-[#d5cedd]">{project.category}</dd>
                </div>
                <div className="border-b border-violet-400/10 pb-4">
                  <dt className="text-[#766f82]">Year / Source</dt>
                  <dd className="mt-1 text-[#d5cedd]">{project.year}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-violet-400/15 bg-violet-500/[0.06] px-2.5 py-1 text-xs text-[#9f97ab]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 border border-violet-400/60 bg-violet-600/20 px-5 py-3 font-mono text-xs uppercase text-white transition hover:bg-violet-600/40"
                >
                  View on Behance
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              )}
            </aside>
          </div>
        </MotionSection>

        <ProjectGallery images={project.images} title={project.title} />
      </div>
    </main>
  );
}
