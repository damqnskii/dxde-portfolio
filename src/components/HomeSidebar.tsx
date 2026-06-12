import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gem } from "lucide-react";
import { profile } from "@/data/profile";

const collaborators = [
  {
    name: "Karl",
    handle: "@Karl",
    href: "https://www.youtube.com/@Karl",
    image: "/clients/karl.jpg",
  },
  {
    name: "Purpled",
    handle: "@PurpledMC",
    href: "https://www.youtube.com/@PurpledMC",
    image: "/clients/purpled.jpg",
  },
  {
    name: "Ish",
    handle: "@ish",
    href: "https://www.youtube.com/@ish",
    image: "/clients/ish.jpg",
  },
];

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-mono text-sm font-semibold uppercase text-[#eee8f7]">
      <Gem className="size-4 text-[#bd68ff]" aria-hidden="true" />
      {children}
    </h2>
  );
}

export function HomeSidebar() {
  return (
    <aside className="grid content-start gap-5">
      <section className="border border-violet-400/20 bg-[#0b0917]/92 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <SidebarHeading>About me</SidebarHeading>
        <p className="mt-5 leading-7 text-[#aaa3b8]">
          Level designer focused on readable spaces, strong atmosphere and
          memorable Minecraft environments. Every project balances gameplay,
          composition and visual storytelling.
        </p>
        <div className="relative mx-auto mt-7 aspect-square w-36 overflow-hidden border border-violet-400/25 bg-violet-500/10">
          <Image
            src="/icon.png"
            alt={`${profile.name} pixel avatar`}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border border-violet-400/20 bg-[#0b0917]/92 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <SidebarHeading>Worked with</SidebarHeading>
        <p className="mt-4 text-sm leading-6 text-[#8f889e]">
          Selected creator collaborations and commissioned Minecraft work.
        </p>
        <div className="mt-5 grid gap-3">
          {collaborators.map((collaborator) => (
            <Link
              key={collaborator.name}
              href={collaborator.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 border border-violet-400/15 bg-violet-500/[0.04] p-3 transition hover:border-violet-400/55 hover:bg-violet-500/10"
            >
              <div className="relative size-14 shrink-0 overflow-hidden border border-violet-400/25 bg-[#100b20]">
                <Image
                  src={collaborator.image}
                  alt={`${collaborator.name} YouTube channel`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-semibold text-white">
                  {collaborator.name}
                </p>
                <p className="mt-1 text-xs text-[#8f889e]">
                  {collaborator.handle}
                </p>
              </div>
              <ArrowUpRight
                className="size-4 text-[#bd68ff] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

    </aside>
  );
}
