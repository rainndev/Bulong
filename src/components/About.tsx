import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="flex h-screen flex-col justify-center gap-6 rounded-2xl border bg-linear-to-b from-violet-200 via-violet-50 to-transparent p-4 ring-2 ring-violet-200 ring-offset-7 ring-offset-violet-50 backdrop-blur-lg md:rounded-3xl md:p-10 lg:rounded-4xl lg:p-20"
    >
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
