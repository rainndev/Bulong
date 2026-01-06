import Image from "next/image";

const HeroPage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-violet-100 p-5 ring-2 ring-violet-200 ring-offset-7 ring-offset-violet-50 backdrop-blur-lg md:rounded-3xl md:p-10 lg:rounded-4xl lg:p-20">
      {/* top circular gradient background */}
      <div className="pointer-events-none absolute top-20 left-5 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl md:top-96 md:left-20 md:h-120 md:w-300" />

      {/* bottom circular gradient background */}
      <div className="pointer-events-none absolute right-0 bottom-20 h-20 w-50 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl md:h-80 md:w-100" />

      <div className="absolute top-0 left-0 flex h-full w-full flex-col rounded-2xl bg-violet-100/60 p-2 backdrop-blur-lg md:rounded-3xl md:p-15 md:ring-offset-10 lg:flex-row lg:rounded-4xl">
        <div className="p-5 md:flex-1">
          <h1 className="mt-10 text-center text-[clamp(2rem,5vw,96rem)] font-bold text-pretty text-[#242731] md:mt-20">
            Sabihin mo na.
          </h1>
          <span className="block text-center text-sm text-gray-600 md:text-lg lg:text-xl">
            Isang link para sa tanong, confessions, at mga “di masabi” —
            anonymous 👀
          </span>
        </div>

        <div className="@container relative mt-10 flex h-full flex-1 items-center justify-center rounded-2xl">
          <div>
            <div className="absolute -right-10 -bottom-10 h-20 w-20 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl md:h-40 md:w-40" />
          </div>

          <div className="lg:rounded-5xl absolute top-[30%] bottom-10 left-0 z-5 w-40 rounded-3xl bg-violet-400 ring-3 ring-violet-300 ring-offset-2 @md:w-50 @md:rounded-4xl @lg:w-100" />
          <div className="lg:rounded-5xl absolute top-10 right-0 z-5 h-40 w-40 rounded-3xl bg-violet-400 ring-3 ring-violet-300 ring-offset-2 @md:h-50 @md:w-60 @md:rounded-4xl @lg:h-70 @lg:w-100" />

          <div className="z-10 flex flex-col items-center">
            <Image
              src={"/bulong-hero.png"}
              alt="Bulong Hero Image"
              width={450}
              height={500}
              className="drop-shadow-3xl translate-y-12 object-contain drop-shadow-violet-300"
            />

            <div className="z-11 mb-5 -rotate-3 rounded-2xl border border-violet-400 bg-violet-200 p-5 text-center text-lg text-[#242731] ring-1 ring-violet-300 md:mb-10 md:rounded-3xl md:p-10 md:text-2xl lg:rounded-4xl lg:p-20">
              <p className="text-[clamp(1rem,2vw,1.5rem)]">
                The best way to gather honest feedback from your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
