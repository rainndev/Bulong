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
    <div className="mb-1 flex w-full gap-2">
      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm">
        <IoIosBrowsers />
        {data?.browser || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm">
        <FaLocationDot />
        {data?.country || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm">
        <MdDevices />
        {data?.device || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm">
        <IoHardwareChip />
        {data?.OS || "Unknown"}
      </span>

      <span className="flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm">
        <FaCity />
        {data?.region || "Unknown"}
      </span>
    </div>
  );
};

export default AnonymousInfoTags;
