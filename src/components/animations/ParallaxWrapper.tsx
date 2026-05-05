"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

/**
 * Translates children on the Y axis as the wrapper scrolls through the viewport.
 * speed = 0.2 → drifts up 20% of section travel; speed = -0.2 → drifts down.
 */
export function ParallaxWrapper({ children, speed = 0.2, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
