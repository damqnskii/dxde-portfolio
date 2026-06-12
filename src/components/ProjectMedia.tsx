"use client";

import { useState } from "react";
import Image from "next/image";
import { Boxes } from "lucide-react";

type ProjectMediaProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ProjectMedia({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#100b20]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(168,85,247,0.18)_25%,transparent_25%,transparent_50%,rgba(168,85,247,0.18)_50%,rgba(168,85,247,0.18)_75%,transparent_75%)] bg-[length:48px_48px] opacity-35" />
        <div className="relative flex flex-col items-center gap-3 text-violet-300/70">
          <Boxes className="size-10" aria-hidden="true" />
          <span className="font-mono text-xs uppercase">Image coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
