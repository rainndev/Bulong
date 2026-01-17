"use client";

import { useSettingsContext } from "@/context/SettingsContext";
import { hideMessage } from "@/lib/utils";

type TitleContentProps = {
  data: { title: string; content: string; isRead: boolean };
};

const TitleContent = ({ data }: TitleContentProps) => {
  const { isHideUnreadMessage, setIsHideUnreadMessage } = useSettingsContext();

  return (
    <div className="flex min-w-0 flex-col text-sm">
      <h1 className="mb-1 truncate text-[clamp(1rem,2vw,1.125rem)] font-semibold antialiased">
        {isHideUnreadMessage
          ? hideMessage(data.title, data.isRead)
          : data.title}
      </h1>
      <p className="truncate text-[clamp(0.75remrem,2vw,0.875rem)] text-[#949494] antialiased">
        {isHideUnreadMessage
          ? hideMessage(data.content, data.isRead)
          : data.content}
      </p>
    </div>
  );
};

export default TitleContent;
