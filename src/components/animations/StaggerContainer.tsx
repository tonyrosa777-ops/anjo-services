"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.15,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/**
 * Pair with StaggerContainer to give each child the staggered fade-up.
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};
