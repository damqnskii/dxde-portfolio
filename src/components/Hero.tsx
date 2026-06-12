"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[520px] overflow-hidden border border-violet-400/20 bg-[#0a0816]"
    >
      <ProjectMedia
        src="/projects/personal-projects/snimka 1.png"
        alt="Minecraft level design environment"
        sizes="(min-width: 1024px) 70vw, 100vw"
        priority
        className="object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#080713_4%,rgba(8,7,19,0.92)_38%,rgba(8,7,19,0.38)_72%,rgba(8,7,19,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,#080713_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(192,107,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(192,107,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 flex min-h-[520px] max-w-3xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-7 inline-flex w-fit items-center gap-2 border border-violet-400/30 bg-violet-500/10 px-4 py-2 font-mono text-xs uppercase text-[#d28cff]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {profile.availability}
        </div>

        <p className="mb-4 font-mono text-sm uppercase text-[#a69daf]">
          {profile.name} / {profile.role}
        </p>
        <h1 className="max-w-3xl font-mono text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
          Building immersive{" "}
          <span className="text-[#b45cff] [text-shadow:0_0_24px_rgba(180,92,255,0.45)]">
            Minecraft worlds
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#b7afc3] sm:text-lg">
          {profile.shortIntro}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex h-13 items-center justify-center gap-4 border border-violet-400/70 bg-[linear-gradient(135deg,#7c24d8,#a83df0)] px-6 text-sm font-semibold uppercase text-white shadow-[0_0_28px_rgba(168,61,240,0.25)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            View my work
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-13 items-center justify-center border border-violet-400/30 bg-[#0c0919]/85 px-6 text-sm font-semibold uppercase text-white transition hover:border-violet-400/70 hover:bg-violet-500/10"
          >
            Contact me
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
