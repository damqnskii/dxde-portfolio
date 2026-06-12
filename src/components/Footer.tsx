import Link from "next/link";
import { FaDiscord, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { profile } from "@/data/profile";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/dxde/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://x.com/igndxde",
    label: "X",
    icon: FaXTwitter,
  },
  {
    href: "discord://-/users/247703403151622144",
    label: "Discord",
    icon: FaDiscord,
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 border border-violet-400/15 bg-[#080713]/90 px-6 py-6 text-sm text-[#8f889e] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex size-10 items-center justify-center border border-violet-400/20 bg-violet-400/[0.04] text-[#aaa3b8] transition hover:border-violet-400/60 hover:bg-violet-500/15 hover:text-[#ce8cff]"
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Level design from{" "}
          {profile.location}.
        </p>
      </div>
    </footer>
  );
}
