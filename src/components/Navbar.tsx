"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const initials = profile.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    function updateHash() {
      setHash(window.location.hash);
    }

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  function isActive(href: string) {
    if (href.includes("#")) {
      const [hrefPathname, hrefHash] = href.split("#");

      return pathname === hrefPathname && hash === `#${hrefHash}`;
    }

    if (hash) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/projects") {
      return pathname.startsWith("/projects");
    }

    if (href === "/contact") {
      return pathname === "/contact";
    }

    return false;
  }

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-7 sm:px-8 lg:px-10"
        aria-label="Primary navigation"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-[0.65rem] bg-transparent text-xl font-semibold tracking-tight text-neutral-950 transition group-hover:-translate-y-0.5">
            {initials}
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-14 text-sm font-medium text-neutral-700 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 transition hover:text-neutral-950"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                <span
                  className={`absolute left-1/2 top-full size-1 -translate-x-1/2 rounded-full bg-neutral-950 transition duration-300 ${
                    active
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-40"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white shadow-[0_18px_38px_rgba(23,23,23,0.18)] transition hover:-translate-y-0.5 hover:bg-neutral-800 sm:px-5"
        >
          <span className="sm:hidden">Let&apos;s talk</span>
          <span className="hidden sm:inline">Let&apos;s work together</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
