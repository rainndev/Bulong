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

        {/* how it works */}
        <div className="grid w-full max-w-2xl grid-cols-1 gap-8 px-2 pt-8 sm:grid-cols-2 md:pt-10">
          <div className="relative rotate-1 rounded-lg border-2 border-[#1f1c14] bg-white p-5 text-left shadow-[8px_8px_0_#1f1c14]">
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
          </div>

          <div className="relative -rotate-1 rounded-lg border-2 border-[#1f1c14] bg-[#a3e635] p-5 text-left shadow-[8px_8px_0_#1f1c14]">
            <p className="text-lg leading-snug font-bold">
              &ldquo;psst… crush kita since freshman year. sana mapansin mo
              ako.&rdquo;
            </p>
            <p className="mt-2 text-right text-sm font-bold text-[#1f1c14]/60">
              — anonymous
            </p>

            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              aria-hidden="true"
              focusable="false"
              className="absolute -right-6 -bottom-5 hidden rotate-[20deg] sm:block"
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
