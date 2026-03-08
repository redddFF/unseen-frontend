"use client";
import { useEffect, useRef } from "react";

export default function SmartVideo(
  props: React.VideoHTMLAttributes<HTMLVideoElement>
) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} playsInline muted loop {...props} />;
}
