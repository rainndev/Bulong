const About = () => {
  return (
    <div
      id="about"
      className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 overflow-hidden p-4 py-16 md:p-10"
    >
      <h2 className="relative text-center text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight">
        About
        <svg
          className="absolute -bottom-4 left-1/2 w-2/3 -translate-x-1/2"
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
      </h2>

      <p className="max-w-2xl text-center text-lg leading-relaxed text-[#1f1c14]/80 md:text-xl">
        Bulong is an anonymous confession platform designed to provide users
        with a safe and secure space to share their thoughts, feelings, and
        experiences without revealing their identity. Whether it&apos;s a
        secret crush, a personal struggle, or a heartfelt message, Bulong
        allows users to express themselves freely and connect with others in a
        supportive environment.
      </p>
    </div>
  );
};

export default About;
