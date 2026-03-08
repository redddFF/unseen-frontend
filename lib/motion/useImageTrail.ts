"use client";
import { useEffect } from "react";
import gsap from "gsap";

export function useImageTrail(
  selector: string,
  images: string[] = [],
  size = { w: 160, h: 100 }
) {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_UNSEEN_TRAIL !== "1" ||
      typeof window === "undefined" ||
      window.innerWidth < 1024
    )
      return;

    const zone = document.querySelector(selector) as HTMLElement | null;
    if (!zone || images.length === 0) return;

    const trail = document.createElement("div");
    trail.style.cssText = `
      position: fixed; z-index: 999; pointer-events: none;
      width:${size.w}px; height:${size.h}px; opacity:.0; will-change: transform, opacity;
      mix-blend-mode: screen; border: 1px solid rgba(255,255,255,.1);
      background-position: center; background-size: cover;
    `;
    document.body.appendChild(trail);

    const set = gsap.quickSetter(trail, "transform");
    let enter = false;

    const move = (e: MouseEvent) => {
      if (!enter) return;
      set(`translate3d(${e.clientX + 12}px, ${e.clientY + 12}px,0)`);
      const idx = Math.floor((e.clientX / window.innerWidth) * images.length) % images.length;
      trail.style.backgroundImage = `url(${images[idx]})`;
    };

    const onEnter = () =>
      gsap.to(trail, {
        opacity: 0.9,
        duration: 0.18,
        ease: "power2.out",
        onStart: () => (enter = true),
      });
    const onLeave = () =>
      gsap.to(trail, {
        opacity: 0.0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => (enter = false),
      });

    zone.addEventListener("mouseenter", onEnter);
    zone.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", move);

    return () => {
      zone.removeEventListener("mouseenter", onEnter);
      zone.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", move);
      trail.remove();
    };
  }, [selector, images, size.w, size.h]);
}
