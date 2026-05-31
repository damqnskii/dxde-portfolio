"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

const metrics = [
  { value: profile.stats.projectViews, label: "project views on Behance" },
  { value: profile.stats.appreciations, label: "project appreciations" },
  { value: profile.stats.followers, label: "Behance follower" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl content-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            {profile.availability}
          </div>

          <p className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-5 max-w-2xl text-2xl font-medium tracking-tight text-neutral-800 sm:text-3xl">
            {profile.role}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            {profile.shortIntro}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View projects
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
            >
              Start a conversation
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="flex items-center lg:justify-end"
        >
          <div className="w-full max-w-md rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-2xl shadow-neutral-200/70">
            <div className="rounded-[1.5rem] bg-neutral-950 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-400">
                Selected focus
              </p>
              <div className="mt-16 space-y-5">
                <p className="text-3xl font-semibold tracking-tight">
                  Self-motivated level design with organized execution and
                  ambitious visual results.
                </p>
                <p className="leading-7 text-neutral-300">
                  Public Behance work includes personal explorations,
                  marketplace projects, commissions, and fantasy environment
                  concepts.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-neutral-200 bg-stone-50 p-4"
                >
                  <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
