"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  from?: number;
  className?: string;
};

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  from = 0.92,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
