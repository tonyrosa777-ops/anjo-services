"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  className?: string;
};

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  distance = 40,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const x = direction === "left" ? -distance : distance;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
