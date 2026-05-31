import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const initials = profile.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-stone-50/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-neutral-950 sm:block">
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-neutral-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-950 shadow-sm transition hover:border-neutral-950 hover:shadow-md"
        >
          Let&apos;s talk
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
