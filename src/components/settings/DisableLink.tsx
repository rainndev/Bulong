"use client";

import { Switch } from "@/components/ui/switch";
import { toggleLinkAcceptance } from "@/lib/actions/user";
import { useEffect, useState, useTransition } from "react";

type DisableLinkProps = {
  userId: string;
  initialValue?: boolean;
};

const DisableLink = ({ userId, initialValue }: DisableLinkProps) => {
  const [enabled, setEnabled] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setEnabled(initialValue);
  }, [initialValue]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow shadow-violet-100 md:gap-6 md:p-7 lg:p-10">
      <p className="text-[clamp(1rem,2vw,1.125rem)]">
        Accept Messages{" "}
        <span className="ml-2 rounded-lg bg-violet-300 px-2 py-1 text-[clamp(.75rem,2vw,.9rem)] text-white">
          {enabled ? "Inactive " : "Active"}
        </span>
      </p>

      <Switch
        className="cursor-pointer"
        checked={enabled}
        disabled={isPending}
        onCheckedChange={(value) => {
          setEnabled(value);
          startTransition(() => {
            toggleLinkAcceptance(userId, value);
          });
        }}
        id="disable-link"
      />
    </div>
  );
};

export default DisableLink;
