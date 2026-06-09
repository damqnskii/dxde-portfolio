"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallbackHref: string;
  label: string;
  className?: string;
};

export function BackButton({ fallbackHref, label, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const referrer = document.referrer;
    const hasSameOriginReferrer =
      referrer && new URL(referrer).origin === window.location.origin;

    if (hasSameOriginReferrer && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}
