"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
