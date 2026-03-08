"use client";
import { useEffect, useRef, useState } from "react";

export default function Screensaver() {
  if (
    process.env.NEXT_PUBLIC_UNSEEN_SCREENSAVER !== "1" ||
    typeof window === "undefined" ||
    window.innerWidth < 1024
  )
    return null;

  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idle = setTimeout(() => setActive(true), 30000);
    const reset = () => {
      clearTimeout(idle);
      setActive(false);
      idle = setTimeout(() => setActive(true), 30000);
    };
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    let x = 80,
      y = 80,
      vx = 2.1,
      vy = 1.8,
      raf = 0;
    const step = () => {
      const w = window.innerWidth,
        h = window.innerHeight,
        bw = el.clientWidth,
        bh = el.clientHeight;
      x += vx;
      y += vy;
      if (x <= 0 || x + bw >= w) vx *= -1;
      if (y <= 0 || y + bh >= h) vy *= -1;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div
        ref={ref}
        className="absolute top-0 left-0 text-white font-black select-none"
        style={{
          fontSize: "clamp(20px, 3vw, 36px)",
          filter: "drop-shadow(0 0 6px rgba(0,0,255,.35))",
          letterSpacing: "0.12em",
        }}
      >
        UNSEEN
      </div>
    </div>
  );
}
