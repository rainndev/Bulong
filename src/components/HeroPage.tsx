"use client";

import Animated3DIcons from "@/components/landing/Animated3DIcons";
import ClaimHandle from "@/components/landing/ClaimHandle";
import { PushPin, SafetyPin } from "@/components/pins";
import { motion, MotionConfig, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const WiggleUnderline = ({ className }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 300 20"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ delay: 0.7, duration: 0.7, ease: "easeInOut" }}
  >
    <path
      d="M 4 12 Q 50 4, 100 10 T 200 10 T 296 12"
      fill="none"
      stroke="#65a30d"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </motion.svg>
);

type PinnedMessage = {
  body: string;
  rotate: string;
  bg: string;
  pinPosition: string;
  pin: "push" | "safety";
};

const pinnedMessages: PinnedMessage[] = [
  {
    body: "psst… crush kita since freshman year. sana mapansin mo ako.",
    rotate: "-rotate-2",
    bg: "bg-[#a3e635]",
    pinPosition: "-top-5 left-5",
    pin: "safety",
  },
  {
    body: "grabe ka mag-code, sana ganun din ako kalakas mag-debug ng buhay ko.",
    rotate: "rotate-1",
    bg: "bg-white",
    pinPosition: "-top-4 right-8",
    pin: "push",
  },
];

const HeroPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div id="hero" className="relative w-full overflow-hidden">
        {/* floating 3D emoji decorations (desktop only) */}
        <Animated3DIcons side="left" />
        <Animated3DIcons side="right" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center gap-8 py-10 text-center md:gap-10 md:py-24"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] font-bold tracking-tight"
          >
            Ask Me Anything,
            <br />
            <span className="relative inline-block px-1">
              No Names
              <WiggleUnderline className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md px-2 text-lg leading-relaxed md:text-xl"
          >
            Share your link and receive anonymous messages from anyone,
            anywhere.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-md">
            <ClaimHandle />
          </motion.div>

          {/* pinned anonymous messages — overlapping stack on mobile, grid on desktop */}
          <motion.div
            variants={cardsContainerVariants}
            className="w-full max-w-3xl px-2 pt-14 md:grid md:grid-cols-2 md:gap-10 md:pt-16"
          >
            {pinnedMessages.map((message, index) => (
              <motion.figure
                key={message.body}
                variants={cardVariants}
                style={{ zIndex: pinnedMessages.length - index }}
                className={`relative rounded-lg border-2 border-[#1f1c14] ${message.bg} ${message.rotate} p-5 pt-7 text-left shadow-[8px_8px_0_#1f1c14] ${
                  index > 0 ? "-mt-24 md:mt-0" : ""
                } ${index > 0 ? "ml-4 md:ml-0" : ""} ${
                  index > 0 ? "mr-4 md:mr-0" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute ${message.pinPosition} -rotate-12`}
                >
                  {message.pin === "safety" ? <SafetyPin /> : <PushPin />}
                </span>

                <blockquote className="text-lg leading-snug font-bold">
                  &ldquo;{message.body}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-right text-sm font-bold text-[#1f1c14]/60">
                  — anonymous
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default HeroPage;
