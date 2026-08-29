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

type PinnedMessage = {
  body: string;
  rotate: string;
  bg: string;
  pinPosition: string;
};

const pinnedMessages: PinnedMessage[] = [
  {
    body: "psst… crush kita since freshman year. sana mapansin mo ako.",
    rotate: "-rotate-2",
    bg: "bg-[#a3e635]",
    pinPosition: "-top-4 left-6",
  },
  {
    body: "grabe ka mag-code, sana ganun din ako kalakas mag-debug ng buhay ko.",
    rotate: "rotate-1",
    bg: "bg-white",
    pinPosition: "-top-4 right-8",
  },
  {
    body: "to the one sa likod ng library — salamat sa tissue noong exam week.",
    rotate: "rotate-2",
    bg: "bg-white",
    pinPosition: "-top-4 left-10",
  },
  {
    body: "honest feedback lang: matalino ka, konting confidence na lang kulang mo.",
    rotate: "-rotate-1",
    bg: "bg-[#a3e635]",
    pinPosition: "-top-4 right-6",
  },
];

const HeroPage = () => {
  return (
    <div id="hero" className="relative w-full overflow-hidden">
      <div className="flex flex-col items-center gap-8 py-10 text-center md:gap-10 md:py-24">
        <p className="flex items-center gap-2 text-base font-bold md:text-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M 3 10 L 8 15 L 17 4"
              stroke="#22a06b"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Anonymous na mensahe, totoong opinyon.
        </p>

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
                <PushPin />
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
