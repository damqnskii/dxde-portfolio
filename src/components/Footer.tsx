import Link from "next/link";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { FaBehance, FaInstagram, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: profile.socials.behance, label: "Behance", icon: FaBehance },
  { href: profile.socials.twitter, label: "Twitter", icon: FaXTwitter },
  { href: profile.socials.instagram, label: "Instagram", icon: FaInstagram },
  profile.email
    ? { href: `mailto:${profile.email}`, label: "Email", icon: Mail }
    : null,
].filter((link) => link !== null);

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-200/80 bg-stone-50/92 shadow-[0_-24px_70px_rgba(23,23,23,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with care in{" "}
          {profile.location}.
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white/75 text-neutral-600 shadow-[0_8px_22px_rgba(23,23,23,0.05)] transition hover:border-neutral-950 hover:bg-white hover:text-neutral-950"
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
