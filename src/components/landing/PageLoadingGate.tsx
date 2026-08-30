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
          className="sketch-grid fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-[#fdfaf2]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          aria-live="polite"
          aria-busy="true"
        >
          <p className="font-kalam flex flex-wrap items-center justify-center gap-1 text-xl font-bold text-[#1f1c14] sm:text-3xl">
            loading
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="inline-block size-1.5 rounded-xs bg-[#1f1c14] sm:size-2"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoadingGate;
