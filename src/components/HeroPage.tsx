const HeroPage = () => {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center rounded-4xl bg-violet-100 p-5 md:p-10 lg:p-20">
      {/* top circular gradient background */}
      <div className="absolute top-96 left-180 h-120 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl" />

      {/* bottom circular gradient background */}
      <div className="absolute right-0 bottom-20 h-80 w-100 rounded-full bg-linear-to-r from-purple-400 via-violet-500 to-violet-800 opacity-50 blur-3xl" />

      <div className="absolute top-0 left-0 flex h-full w-full flex-col rounded-4xl bg-violet-100/60 ring-2 ring-violet-200 ring-offset-10 ring-offset-violet-50 backdrop-blur-lg">
        <div className="flex-1">
          <h1 className="mt-20 text-center text-3xl font-bold text-[#242731] md:text-7xl">
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
