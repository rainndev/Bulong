import Image from "next/image";

const About = () => {
  return (
    <div
      id="about"
      className="relative flex h-screen flex-col justify-center gap-6 overflow-hidden rounded-2xl border p-4 ring-2 ring-violet-200 ring-offset-7 ring-offset-violet-50 backdrop-blur-lg [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#63e_100%)] md:rounded-3xl md:p-10 lg:rounded-4xl lg:p-20"
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-size-[24px_24px] md:bg-size-[30px_30px] lg:bg-size-[40px_40px]"></div>

      <Image
        src={"/bulong-peeking.png"}
        alt="Bulong Peeking"
        width={200}
        height={200}
        className="absolute -bottom-10 -left-12 mx-auto md:size-48 lg:-bottom-20 lg:-left-20 lg:size-80"
      />
      <h1 className="text-center text-[clamp(2rem,5vw,96rem)] font-bold text-pretty text-[#242731] antialiased md:mt-20">
        About
      </h1>

      <p className="text-center text-[clamp(1rem,3vw,1.5rem)] text-gray-600 antialiased">
        Bulong is an anonymous confession platform designed to provide users
        with a safe and secure space to share their thoughts, feelings, and
        experiences without revealing their identity. Whether it's a secret
        crush, a personal struggle, or a heartfelt message, Bulong allows users
        to express themselves freely and connect with others in a supportive
        environment.
      </p>
    </div>
  );
};

export default About;
