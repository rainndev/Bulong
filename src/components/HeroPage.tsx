const HeroPage = () => {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-violet-100 p-5 ring-2 ring-violet-200 ring-offset-7 ring-offset-violet-50 backdrop-blur-lg md:rounded-3xl md:p-10 lg:rounded-4xl lg:p-20">
      {/* top circular gradient background */}
      <div className="pointer-events-none absolute top-20 left-5 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl md:top-96 md:left-20 md:h-120 md:w-300" />

      {/* bottom circular gradient background */}
      <div className="pointer-events-none absolute right-0 bottom-20 h-20 w-50 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl md:h-80 md:w-100" />

      <div className="absolute top-0 left-0 flex h-full w-full flex-col rounded-2xl bg-violet-100/60 p-4 backdrop-blur-lg md:rounded-3xl md:ring-offset-10 lg:rounded-4xl">
        <div className="flex-1">
          <h1 className="mt-10 text-center text-3xl font-bold text-[#242731] md:mt-20 md:text-7xl">
            Welcome to Bulong
          </h1>
          <span className="mt-3 block text-center text-sm text-gray-600 md:mt-5 md:text-lg">
            Your trusted anonymous feedback companion
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
