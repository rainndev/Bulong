import LoadingAnimation from "@/components/LoadingAnimation";
import NavigationBar from "@/components/NavigationBar";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-dvh">
      <NavigationBar currentPath="/messages" />
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="md:text-md mb-5 text-sm font-medium text-[#242731] antialiased">
          Loading Messages
        </p>
        <LoadingAnimation />
      </div>
    </div>
  );
};

export default loading;
