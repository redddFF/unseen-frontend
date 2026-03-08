"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function gridElasticity(selector = ".motion-grid", from = 10, to = 4) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;

  gsap.fromTo(
    el,
    { gap: from },
    {
      gap: to,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top bottom-=20%",
        end: "bottom top+=20%",
        scrub: 0.6,
      },
    }
  );
}
