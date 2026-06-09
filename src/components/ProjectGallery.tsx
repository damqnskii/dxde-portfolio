"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : (currentIndex - 1 + images.length) % images.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : (currentIndex + 1) % images.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : (currentIndex - 1 + images.length) % images.length,
    );
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : (currentIndex + 1) % images.length,
    );
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mt-16 grid gap-6"
      >
        {images.map((image, index) => (
          <motion.button
            key={image}
            type="button"
            variants={{
              hidden: { opacity: 0, y: 26 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 text-left shadow-sm outline-none transition focus-visible:ring-4 focus-visible:ring-neutral-950/15"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${title} project image ${index + 1} fullscreen`}
          >
            <Image
              src={image}
              alt={`${title} project image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/94 px-4 py-6 backdrop-blur-sm sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image viewer`}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/18 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 sm:right-6 sm:top-6"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/18 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 sm:left-6"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPreviousImage();
                  }}
                  aria-label="Show previous image"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/18 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 sm:right-6"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNextImage();
                  }}
                  aria-label="Show next image"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            ) : null}

            <motion.div
              className="relative h-full max-h-[88vh] w-full max-w-7xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={`${title} project image ${(activeIndex ?? 0) + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
