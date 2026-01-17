"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const SpoilUnreadMessages = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-violet-100 p-5 md:gap-6 md:p-7 lg:p-10">
      <p className="text-[clamp(1rem,2vw,1.125rem)]">
        Spoil Unread Messages{" "}
        <span className="ml-2 rounded-lg bg-violet-300 px-2 py-1 text-[clamp(.75rem,2vw,.9rem)] text-white">
          {isEnabled ? "Enabled" : "Disabled"}
        </span>
      </p>

      <Switch
        className="cursor-pointer"
        checked={isEnabled}
        onCheckedChange={() => setIsEnabled(!isEnabled)}
        id="hide-unread-messages"
      />
    </div>
  );
};

export default SpoilUnreadMessages;
