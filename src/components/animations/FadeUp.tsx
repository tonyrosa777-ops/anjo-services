"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  className?: string;
};

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  distance = 20,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
