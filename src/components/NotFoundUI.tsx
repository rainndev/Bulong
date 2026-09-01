import Link from "next/link";

const NotFoundUI = () => {
  return (
    <div className="sketch-grid flex min-h-dvh w-full flex-col items-center justify-center gap-8 bg-[#fdfaf2] p-5 text-center text-[#1f1c14]">
      <div className="relative -rotate-1 rounded-xl border-2 border-[#1f1c14] bg-white px-10 py-8 shadow-[8px_8px_0_#1f1c14] md:px-16 md:py-10">
        <h1 className="text-[clamp(3.5rem,12vw,7rem)] leading-none font-bold tracking-tight">
          404
        </h1>
        <svg
          viewBox="0 0 300 16"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="mt-2 h-4 w-full"
        >
          <path
            d="M 4 10 Q 50 2, 100 8 T 200 8 T 296 10"
            fill="none"
            stroke="#65a30d"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-md">
        <h2 className="font-kalam text-xl leading-snug font-bold md:text-2xl">
          Hindi mahanap.
        </h2>
      </div>

      <Link
        href="/"
        className="rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-6 py-3 text-sm font-bold shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none md:text-base"
      >
        Home →
      </Link>
    </div>
  );
};

export default NotFoundUI;
