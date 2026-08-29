import Image from "next/image";
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

const CheckSquare = ({ checked }: { checked: boolean }) => (
  <span
    aria-hidden="true"
    className={`mt-0.5 size-3.5 shrink-0 rounded-[3px] border-2 border-[#1f1c14] ${
      checked ? "bg-[#22a06b]" : "bg-transparent"
    }`}
  />
);

const HeroPage = () => {
  return (
    <div id="hero" className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-3 flex items-center gap-2 text-base font-bold md:text-lg">
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

          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] font-bold tracking-tight">
            Sabihin mo na,
            <br />
            <span className="relative inline-block px-1">
              nang anonymous.
              <WiggleUnderline className="absolute -bottom-3 left-0 w-full" />
            </span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed md:text-xl">
            Isang link para sa tanong, confessions, at mga hindi mo masabi nang
            harapan. Ibulong na nila — ikaw ang magbabasa.
          </p>

          <div className="mt-8 flex w-full justify-center lg:justify-start">
            <ClaimHandle />
          </div>

          <p className="mt-6 text-base font-bold md:text-lg">
            May account na?{" "}
            <Link
              href="/sign-in"
              className="underline decoration-[#65a30d] decoration-2 underline-offset-4 hover:text-[#4d7c0f]"
            >
              Log in →
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col items-center gap-8">
          <p className="-rotate-3 text-lg font-bold text-[#1f1c14]/70">
            ganyan kadali lang
          </p>

          <div className="rotate-2 rounded-lg border-2 border-[#1f1c14] bg-white p-3 shadow-[8px_8px_0_#1f1c14]">
            <Image
              src="/bulong-hero.png"
              alt="Bulong Hero Image"
              priority
              width={450}
              height={500}
              className="h-auto w-full max-w-xs object-contain md:max-w-sm"
            />
          </div>

          <div className="relative w-full max-w-xs -rotate-1 rounded-lg border-2 border-[#1f1c14] bg-white p-5 shadow-[8px_8px_0_#1f1c14]">
            <h2 className="mb-2 text-xl font-bold">paano gumagana</h2>
            <ul className="space-y-1.5 text-base leading-snug">
              <li className="flex items-center gap-2">
                <CheckSquare checked={false} />
                i-share ang link mo
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare checked={true} />
                magpadala sila ng anonymous message
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare checked={false} />
                basahin lahat sa dashboard mo
              </li>
            </ul>

            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              aria-hidden="true"
              focusable="false"
              className="absolute -right-8 -bottom-6 rotate-[20deg]"
            >
              <path
                d="M 10 40 Q 20 10, 60 20 L 55 14 M 60 20 L 56 28"
                stroke="#65a30d"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
