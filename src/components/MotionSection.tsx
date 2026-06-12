"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  delay?: number;
};

export function MotionSection({
  children,
  className,
  delay = 0,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
