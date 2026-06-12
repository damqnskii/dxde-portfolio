"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";

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
        className="mx-auto mt-5 grid w-full max-w-6xl gap-5 border border-violet-400/20 bg-[#090714]/90 p-4 sm:p-6"
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
            className="group relative aspect-[16/10] overflow-hidden border border-violet-400/20 bg-[#100b20] text-left outline-none transition hover:border-violet-400/55 focus-visible:ring-2 focus-visible:ring-violet-400"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${title} project image ${index + 1} fullscreen`}
          >
            <ProjectMedia
              src={image}
              alt={`${title} project image ${index + 1}`}
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030208]/96 px-4 py-6 backdrop-blur-sm sm:px-8"
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
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center border border-violet-400/30 bg-[#0d0a1b] text-white transition hover:border-violet-400/70 hover:bg-violet-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:right-6 sm:top-6"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-violet-400/30 bg-[#0d0a1b] text-white transition hover:border-violet-400/70 hover:bg-violet-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:left-6"
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
                  className="absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-violet-400/30 bg-[#0d0a1b] text-white transition hover:border-violet-400/70 hover:bg-violet-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:right-6"
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
