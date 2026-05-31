"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const introVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: premiumEase,
      staggerChildren: 0.08,
    },
  },
};

const introItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: premiumEase },
  },
};

export function Hero() {
  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#f7f7f4] pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-14 size-[720px] rounded-full border border-neutral-950/10" />
        <div className="absolute right-10 top-32 size-[520px] rounded-full border border-neutral-950/10" />
        <div className="absolute right-[20%] top-[46%] size-4 rounded-full border border-neutral-950/20 bg-white shadow-[0_0_0_7px_rgba(255,255,255,0.75)]" />
        <div className="absolute right-0 top-20 h-[1px] w-[52rem] rotate-[128deg] bg-white shadow-[0_0_22px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-[8%] top-[50%] h-[1px] w-[55rem] -rotate-[10deg] bg-white/80 shadow-[0_0_22px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-52 top-56 size-80 rounded-full bg-neutral-950/[0.035] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-24 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:pb-28 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={introVariants}
          className="relative z-10 flex flex-col justify-center"
        >
          <motion.p
            variants={introItem}
            className="mb-9 text-xs font-medium uppercase tracking-[0.42em] text-neutral-500"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={introItem}
            className="max-w-4xl text-[clamp(4.25rem,10vw,8.8rem)] font-medium leading-[0.92] tracking-[-0.04em] text-neutral-950"
          >
            {firstName}
            {lastName && (
              <>
                <br />
                {lastName}
              </>
            )}
          </motion.h1>

          <motion.p
            variants={introItem}
            className="mt-8 max-w-lg text-lg leading-8 text-neutral-600"
          >
            {profile.shortIntro}
          </motion.p>

          <motion.div
            variants={introItem}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/projects"
              className="inline-flex h-14 items-center justify-center gap-4 rounded-xl bg-neutral-950 px-7 text-sm font-medium text-white shadow-[0_18px_38px_rgba(23,23,23,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              View my work
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center gap-4 rounded-xl px-5 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5"
            >
              Contact me
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.74, delay: 0.16, ease: premiumEase }}
          className="relative z-10 hidden items-center lg:flex lg:justify-end"
        >
          <div className="mr-8 mt-20 w-full max-w-72 rounded-2xl border border-white/75 bg-white/82 px-11 py-11 shadow-[0_34px_105px_rgba(23,23,23,0.13)] backdrop-blur-xl xl:mr-16">
            <div className="space-y-12">
              <div>
                <p className="flex items-center gap-5 text-sm font-medium uppercase tracking-[0.32em] text-neutral-400">
                  <span className="size-2 rounded-full bg-neutral-400" />
                  Based in
                </p>
                <p className="mt-6 text-lg font-medium text-neutral-950">
                  {profile.location}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-400">
                  Role
                </p>
                <p className="mt-6 text-lg font-medium text-neutral-950">
                  {profile.role}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-400">
                  Available for
                </p>
                <p className="mt-6 text-lg font-medium text-neutral-950">
                  {profile.availability.replace("Available for ", "")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
