"use client";

import { useSettingsContext } from "@/context/SettingsContext";
import { hideMessage } from "@/lib/utils";

type TitleContentProps = {
  data: { title: string; content: string; isRead: boolean };
};

const TitleContent = ({ data }: TitleContentProps) => {
  const { isHideUnreadMessage } = useSettingsContext();

  return (
    <div className="flex min-w-0 flex-col">
      <h1 className="font-fredoka mb-0.5 truncate text-sm font-semibold text-[#171717] antialiased">
        {isHideUnreadMessage
          ? hideMessage(data.title, data.isRead)
          : data.title}
      </h1>
      <p className="font-kalam truncate text-xs font-medium text-[#1f1c14]/50 antialiased">
        &quot;
        {isHideUnreadMessage
          ? hideMessage(data.content, data.isRead)
          : data.content}
        &quot;
      </p>
    </div>
  );
};

export default TitleContent;
