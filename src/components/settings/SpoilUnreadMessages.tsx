"use client";

import { Switch } from "@/components/ui/switch";
import { useSettingsContext } from "@/context/SettingsContext";

const SpoilUnreadMessages = () => {
  const { isHideUnreadMessage, setIsHideUnreadMessage } = useSettingsContext();

  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-[#1f1c14] bg-white p-5 shadow-[6px_6px_0_#1f1c14] transition-transform duration-100 hover:rotate-0 md:p-6">
      <p className="text-base font-bold">
        Spoil Unread Messages{" "}
        <span
          className={`ml-2 rounded-full border-2 border-[#1f1c14] px-2 py-0.5 text-xs font-bold text-[#1f1c14] ${
            isHideUnreadMessage ? "bg-[#a3e635]" : "bg-white"
          }`}
        >
          {isHideUnreadMessage ? "Enabled" : "Disabled"}
        </span>
      </p>

      <Switch
        className="cursor-pointer"
        checked={isHideUnreadMessage}
        onCheckedChange={() => setIsHideUnreadMessage(!isHideUnreadMessage)}
        id="hide-unread-messages"
      />
      <p className="text-xs font-bold text-[#1f1c14]/50">
        Hide preview text of unread messages
      </p>
    </div>
  );
};

export default SpoilUnreadMessages;
