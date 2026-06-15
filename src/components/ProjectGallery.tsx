"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
} from "@/lib/youtube";
import type { ProjectMediaItem } from "@/types/project";

type ProjectGalleryProps = {
  media: ProjectMediaItem[];
  title: string;
};

type YouTubeThumbnailProps = {
  url: string;
  title: string;
};

function YouTubeThumbnail({ url, title }: YouTubeThumbnailProps) {
  const videoId = getYouTubeVideoId(url);
  const [useFallback, setUseFallback] = useState(false);

  if (!videoId) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#100b20] text-[#bd68ff]">
        <Play className="size-12" aria-hidden="true" />
        <span className="font-mono text-xs uppercase">YouTube video</span>
      </div>
    );
  }

  return (
    <Image
      src={getYouTubeThumbnailUrl(
        videoId,
        useFallback ? "hqdefault" : "maxresdefault",
      )}
      alt={`${title} YouTube video thumbnail`}
      fill
      sizes="(min-width: 1024px) 1152px, 100vw"
      unoptimized
      className="object-cover transition duration-500 group-hover:scale-[1.025]"
      onError={() => setUseFallback(true)}
    />
  );
}

export function ProjectGallery({ media, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = media.filter(
    (item): item is Extract<ProjectMediaItem, { type: "image" }> =>
      item.type === "image",
  );
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
        {media.map((item, index) => {
          const imageIndex =
            item.type === "image"
              ? images.findIndex((image) => image === item)
              : null;
          const itemTitle =
            item.type === "youtube" && item.title ? item.title : title;
          const sharedClassName =
            "group relative aspect-[16/10] overflow-hidden border border-violet-400/20 bg-[#100b20] text-left outline-none transition hover:border-violet-400/55 focus-visible:ring-2 focus-visible:ring-violet-400";
          const content =
            item.type === "image" ? (
              <ProjectMedia
                src={item.src}
                alt={item.alt ?? `${title} project image ${imageIndex! + 1}`}
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
              />
            ) : (
              <>
                <YouTubeThumbnail url={item.url} title={itemTitle} />
                <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />
                <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/40 bg-[#8b2be2]/90 text-white shadow-[0_0_30px_rgba(168,61,240,0.45)] transition group-hover:scale-105 group-hover:bg-[#a83df0]">
                  <Play className="size-8 fill-current" aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 left-4 right-4 font-mono text-xs uppercase text-white drop-shadow-lg">
                  {itemTitle}
                </span>
              </>
            );

          const motionProps = {
            variants: {
              hidden: { opacity: 0, y: 26 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.64,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              },
            },
            whileHover: { y: -4 },
            transition: {
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1] as const,
            },
            className: sharedClassName,
          };

          return item.type === "image" ? (
            <motion.button
              key={`${item.src}-${index}`}
              type="button"
              {...motionProps}
              onClick={() => setActiveIndex(imageIndex)}
              aria-label={`Open ${title} project image ${imageIndex! + 1} fullscreen`}
            >
              {content}
            </motion.button>
          ) : (
            <motion.a
              key={`${item.url}-${index}`}
              {...motionProps}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch ${itemTitle} on YouTube`}
            >
              {content}
            </motion.a>
          );
        })}
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
                src={activeImage.src}
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
