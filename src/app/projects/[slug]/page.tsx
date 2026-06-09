import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { MotionSection } from "@/components/MotionSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
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
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-6 lg:px-8">
      <MotionSection className="block">
        <BackButton
          fallbackHref="/projects"
          label="Back to projects"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-500 transition hover:-translate-x-1 hover:text-neutral-950"
        />
      </MotionSection>

      <MotionSection
        delay={0.06}
        className="grid gap-12 pt-12 lg:grid-cols-[1fr_0.38fr]"
      >
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
            {project.category} / {project.year}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-5 max-w-2xl text-2xl font-medium tracking-tight text-neutral-700">
              {project.subtitle}
            </p>
          )}
          <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600">
            {project.longDescription ?? project.description}
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/70">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
            Details
          </p>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="text-neutral-400">Category</dt>
              <dd className="mt-1 font-medium text-neutral-950">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Source</dt>
              <dd className="mt-1 font-medium text-neutral-950">
                {project.year}
              </dd>
            </div>
          </dl>

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

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View on Behance
            </Link>
          )}
        </aside>
      </MotionSection>

      <ProjectGallery images={project.images} title={project.title} />
    </main>
  );
}
