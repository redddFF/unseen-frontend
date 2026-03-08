"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE: any = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  delay = 0,
  as = "div",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
}) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) controls.start("show");
        else if (!once) controls.start("hidden");
      });
    }, { threshold: 0.12 });
    io.observe(node);
    return () => io.disconnect();
  }, [controls, once]);

  const Comp: any = motion[as];

  return (
    <Comp
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
      }}
    >
      {children}
    </Comp>
  );
}
