import NavigationBar from "@/components/NavigationBar";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center  mx-auto bg-gray-50  text-black w-full rounded-3xl h-full">
      <NavigationBar currentPath="/messages" />
      <div className="w-full p-10">Messages</div>
    </div>
  );
};

export default page;
