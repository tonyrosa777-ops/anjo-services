"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({
  end,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
