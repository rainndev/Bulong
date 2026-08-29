"use client";

import ClaimHandle from "@/components/landing/ClaimHandle";
import { PushPin, SafetyPin } from "@/components/pins";
import { motion, MotionConfig, type Variants } from "motion/react";
import Link from "next/link";

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
  {
    body: "to the one sa likod ng library — salamat sa tissue noong exam week.",
    rotate: "rotate-2",
    bg: "bg-white",
    pinPosition: "-top-6 right-6",
    pin: "safety",
  },
  {
    body: "honest feedback lang: matalino ka, konting confidence na lang kulang mo.",
    rotate: "-rotate-1",
    bg: "bg-[#a3e635]",
    pinPosition: "-top-4 right-6",
    pin: "push",
  },
];

const HeroPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div id="hero" className="relative w-full overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8 py-10 text-center md:gap-10 md:py-24"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] font-bold tracking-tight"
          >
            Sabihin mo na,
            <br />
            <span className="relative inline-block px-1">
              nang anonymous.
              <WiggleUnderline className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md px-2 text-lg leading-relaxed md:text-xl"
          >
            Isang link para sa tanong, confessions, at mga hindi mo masabi nang
            harapan. Ibulong na nila — ikaw ang magbabasa.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-md">
            <ClaimHandle />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base font-bold md:text-lg"
          >
            May account na?{" "}
            <Link
              href="/sign-in"
              className="underline decoration-[#65a30d] decoration-2 underline-offset-4 hover:text-[#4d7c0f]"
            >
              Log in →
            </Link>
          </motion.p>

          {/* pinned anonymous messages */}
          <motion.div
            variants={cardsContainerVariants}
            className="grid w-full max-w-3xl grid-cols-1 gap-10 px-2 pt-14 sm:grid-cols-2 md:pt-16"
          >
            {pinnedMessages.map((message) => (
              <motion.figure
                key={message.body}
                variants={cardVariants}
                className={`relative rounded-lg border-2 border-[#1f1c14] ${message.bg} ${message.rotate} p-5 pt-7 text-left shadow-[8px_8px_0_#1f1c14]`}
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
