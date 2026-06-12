"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="mx-auto flex min-h-16 max-w-[1500px] items-center justify-center border border-violet-400/15 bg-[#080713]/88 px-3 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        aria-label="Primary navigation"
      >
        <div className="flex items-center gap-2 sm:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-4 py-5 text-sm font-medium uppercase transition sm:px-7 ${
                  active
                    ? "text-white"
                    : "text-[#aaa3b8] hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-0 h-0.5 bg-[#b95cff] shadow-[0_0_12px_rgba(185,92,255,0.8)] transition sm:inset-x-7 ${
                    active
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
