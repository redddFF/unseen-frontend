"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const EASE: any = [0.16, 1, 0.3, 1];

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);
    const t = setTimeout(() => setShowOverlay(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.28, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "linear" } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%", transition: { duration: 0.6, ease: EASE } }}
        />
      )}

      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.12 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <div
            className="font-black select-none"
            style={{
              color: 'var(--text-primary)',
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "0.1em",
              textShadow: "0 0 6px rgba(0,0,255,0.35)"
            }}
          >
            UNSEEN
          </div>
        </motion.div>
      )}
    </>
  );
}
