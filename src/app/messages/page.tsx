import NavigationBar from "@/components/NavigationBar";
import React from "react";

const page = () => {
  return (
    <div className="h-full flex items-center justify-center  mx-auto  text-black bg-amber-200 w-full">
      <NavigationBar currentPath="/messages" />
      <div className="w-full p-10">Messages</div>
    </div>
  );
};

export default page;
