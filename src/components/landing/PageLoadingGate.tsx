"use client";

import { subscribeIconsReady } from "@/components/landing/iconsReady";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Never block the page longer than this, even if WebGL fails to init
const MAX_WAIT_MS = 5000;

/**
 * Full-page sketch loader shown until the decorative 3D icons are ready.
 * Skipped on viewports below lg (the icons don't render there) and
 * auto-dismisses after a fallback timeout.
 */
const PageLoadingGate = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small screens never mount the 3D canvases — don't wait for them.
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      const mobileTimer = window.setTimeout(() => setIsLoading(false), 0);
      return () => window.clearTimeout(mobileTimer);
    }

    const unsubscribe = subscribeIconsReady(() => setIsLoading(false));
    const fallbackTimer = window.setTimeout(
      () => setIsLoading(false),
      MAX_WAIT_MS,
    );

    return () => {
      unsubscribe();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="sketch-grid fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#fdfaf2]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          aria-live="polite"
          aria-busy="true"
        >
          <p className="font-kalam flex items-center gap-1 text-xl font-bold text-[#1f1c14]">
            loading
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="inline-block size-1.5 rounded-full bg-[#1f1c14]"
                animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </p>

          <svg
            viewBox="0 0 300 16"
            aria-hidden="true"
            className="h-3.5 w-44"
          >
            <path
              d="M 4 10 Q 50 2, 100 8 T 200 8 T 296 10"
              fill="none"
              stroke="#65a30d"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoadingGate;
