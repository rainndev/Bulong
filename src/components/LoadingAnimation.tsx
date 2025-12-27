"use client";

import { motion } from "motion/react";

const LoadingAnimation = () => {
  return (
    <div>
      <ul className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <motion.li
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              delay: i * 0.2,
              repeat: Infinity,
            }}
            className="rounded-sm bg-violet-400 p-1.5 md:p-2"
            key={i}
          />
        ))}
      </ul>
    </div>
  );
};

export default LoadingAnimation;
