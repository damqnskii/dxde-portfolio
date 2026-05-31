"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  return (
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
        <motion.div
          key={image}
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
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-sm"
        >
          <Image
            src={image}
            alt={`${title} project image ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
