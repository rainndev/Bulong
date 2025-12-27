import Image from "next/image";
import React from "react";

const NoSelectedMessage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-violet-100 p-10">
      <Image
        src={"/no-selected-message.png"}
        className="mb-10"
        width={300}
        height={200}
        alt="Illustration of a girl worried because no data is available"
      />
      <h1 className="mb-2 text-2xl font-semibold text-[#242731] antialiased">
        Nothing Selected
      </h1>
      <p className="text-md text-gray-800">
        Choose a message from the list to view its content.
      </p>
    </div>
  );
};

export default NoSelectedMessage;
