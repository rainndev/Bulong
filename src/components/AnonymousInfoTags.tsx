import { PostType } from "@/lib/actions/post";
import React from "react";
import { FaCity } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosBrowsers } from "react-icons/io";
import { IoHardwareChip } from "react-icons/io5";
import { MdDevices } from "react-icons/md";

type AnonymousInfoTagsProps = {
  data: PostType | undefined;
};

const AnonymousInfoTags = ({ data }: AnonymousInfoTagsProps) => {
  return (
    <div className="mb-1 flex w-full flex-wrap gap-2 text-xs md:text-sm">
      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 md:px-4 md:py-2">
        <IoIosBrowsers />
        {data?.browser || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 md:px-4 md:py-2">
        <FaLocationDot />
        {data?.country || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 md:px-4 md:py-2">
        <MdDevices />
        {data?.device || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 md:px-4 md:py-2">
        <IoHardwareChip />
        {data?.OS || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1 md:px-4 md:py-2">
        <FaCity />
        {data?.region || "Unknown"}
      </span>
    </div>
  );
};

export default AnonymousInfoTags;
