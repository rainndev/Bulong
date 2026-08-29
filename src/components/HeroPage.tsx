import Link from "next/link";
import ClaimHandle from "./landing/ClaimHandle";

const WiggleUnderline = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 300 20"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M 4 12 Q 50 4, 100 10 T 200 10 T 296 12"
      fill="none"
      stroke="#65a30d"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const PushPin = ({ className }: { className?: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {/* pin head */}
    <circle
      cx="14"
      cy="9"
      r="6.5"
      fill="#a3e635"
      stroke="#1f1c14"
      strokeWidth="2.5"
    />
    {/* highlight */}
    <path
      d="M 10.5 6.5 Q 12 5, 14 5"
      fill="none"
      stroke="#fdfaf2"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* needle */}
    <path
      d="M 14 15.5 L 14 24"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const SafetyPin = ({ className }: { className?: string }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {/* clasp outer loop */}
    <path
      d="M 22 4 Q 30 5, 29.5 12 Q 29 18, 23 21.5"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* clasp inner loop */}
    <path
      d="M 24.5 8 Q 26.5 9, 26 12 Q 25.5 15, 23 17"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* pin body */}
    <path
      d="M 23 21.5 Q 14 19, 8.5 13 Q 4 8, 6 5.5 Q 8 3, 12 8 Q 17 14.5, 18.5 23.5"
      fill="none"
      stroke="#a3e635"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* needle */}
    <path
      d="M 18.5 23.5 L 22 30"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
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
    <div id="hero" className="relative w-full overflow-hidden">
      <div className="flex flex-col items-center gap-8 py-10 text-center md:gap-10 md:py-24">
        <h1 className="text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] font-bold tracking-tight">
          Sabihin mo na,
          <br />
          <span className="relative inline-block px-1">
            nang anonymous.
            <WiggleUnderline className="absolute -bottom-3 left-0 w-full" />
          </span>
        </h1>

        <p className="max-w-md px-2 text-lg leading-relaxed md:text-xl">
          Isang link para sa tanong, confessions, at mga hindi mo masabi nang
          harapan. Ibulong na nila — ikaw ang magbabasa.
        </p>

        <ClaimHandle />

        <p className="text-base font-bold md:text-lg">
          May account na?{" "}
          <Link
            href="/sign-in"
            className="underline decoration-[#65a30d] decoration-2 underline-offset-4 hover:text-[#4d7c0f]"
          >
            Log in →
          </Link>
        </p>

        {/* pinned anonymous messages */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-10 px-2 pt-14 sm:grid-cols-2 md:pt-16">
          {pinnedMessages.map((message) => (
            <figure
              key={message.body}
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
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
