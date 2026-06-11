import Image from "next/image";

type CrystalBackdropVariant = "page" | "detail" | "section" | "footer";

type CrystalBackdropProps = {
  variant?: CrystalBackdropVariant;
};

const imageClassNames: Record<CrystalBackdropVariant, string> = {
  page: "object-cover object-[62%_center] opacity-72",
  detail: "object-cover object-[72%_center] opacity-58",
  section: "object-cover object-right opacity-34",
  footer: "object-cover object-[70%_72%] opacity-22",
};

export function CrystalBackdrop({
  variant = "page",
}: CrystalBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/images/portfolio-crystal-hero.png"
        alt=""
        fill
        sizes="100vw"
        className={imageClassNames[variant]}
      />

      {variant === "page" && (
        <>
          <div className="absolute inset-0 bg-[#f7f7f4]/42" />
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#f7f7f4]/96 via-[#f7f7f4]/74 to-transparent" />
        </>
      )}

      {variant === "detail" && (
        <>
          <div className="absolute inset-0 bg-[#f7f7f4]/58" />
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#f7f7f4] via-[#f7f7f4]/86 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f7f4] to-transparent" />
        </>
      )}

      {variant === "section" && (
        <>
          <div className="absolute inset-0 bg-[#f7f7f4]/78" />
          <div className="absolute inset-y-0 left-0 w-[64%] bg-gradient-to-r from-[#f7f7f4] via-[#f7f7f4]/94 to-transparent" />
        </>
      )}

      {variant === "footer" && (
        <>
          <div className="absolute inset-0 bg-[#f7f7f4]/88" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/90" />
        </>
      )}
    </div>
  );
}
