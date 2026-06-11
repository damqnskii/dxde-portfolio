"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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
        className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 sm:px-8 sm:py-7 lg:px-10"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-center gap-7 text-base font-medium text-neutral-700 sm:gap-14 sm:text-lg">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-1 py-3 transition hover:text-neutral-950 sm:px-2"
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
      </nav>
    </header>
  );
}
