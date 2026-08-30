"use client";

import { Switch } from "@/components/ui/switch";
import { toggleLinkAcceptance } from "@/lib/actions/user";
import { useEffect, useState, useTransition } from "react";

type DisableLinkProps = {
  userId: string;
  initialValue?: boolean;
};

const DisableLink = ({ userId, initialValue }: DisableLinkProps) => {
  const [isDisabled, setDisabled] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setDisabled(initialValue);
  }, [initialValue]);

  return (
    <div className="flex flex-col gap-4 rounded-xl border-2 border-[#1f1c14] bg-white p-5 shadow-[6px_6px_0_#1f1c14] transition-transform duration-100 hover:rotate-0 md:p-6">
      <p className="text-base font-bold">
        Accept Messages{" "}
        <span
          className={`ml-2 rounded-full border-2 border-[#1f1c14] px-2 py-0.5 text-xs font-bold text-[#1f1c14] ${
            isDisabled ? "bg-white" : "bg-[#a3e635]"
          }`}
        >
          {isDisabled ? "Inactive" : "Active"}
        </span>
      </p>

      <Switch
        className="cursor-pointer"
        checked={!isDisabled}
        disabled={isPending}
        onCheckedChange={(value) => {
          setDisabled(!value);
          startTransition(() => {
            toggleLinkAcceptance(userId, !value);
          });
        }}
        id="disable-link"
      />
      <p className="text-xs font-bold text-[#1f1c14]/50">
        Turn off to pause receiving new messages
      </p>
    </div>
  );
};

export default DisableLink;
