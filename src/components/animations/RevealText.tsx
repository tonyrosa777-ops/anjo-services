"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Props = {
  text: string;
  type?: "words" | "chars";
  stagger?: number;
  className?: string;
};

export function RevealText({
  text,
  type = "words",
  stagger = 0.06,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const items = type === "words" ? text.split(" ") : text.split("");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: i * stagger,
            ease: [0, 0, 0.2, 1] as const,
          }}
        >
          {item}
          {type === "words" && i < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
