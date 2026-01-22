import DisableLink from "@/components/settings/DisableLink";
import LimitMessage from "@/components/settings/LimitMessage";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import SpoilUnreadMessages from "@/components/settings/SpoilUnreadMessages";
import SideBar from "@/components/SideBar";
import { requireAuth } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Settings | Bulong",
};

const page = async () => {
  const session = await requireAuth();
  const userId = session?.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      dailyLimit: true,
      isDisabled: true,
    },
  });

  const saveSettings = async (form: FormData) => {
    "use server";
    const dailyLimit = parseInt(form.get("dailyLimit") as string, 10) || 0;

    console.log("Daily Limit to be set:", dailyLimit);

    // Update daily limit in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dailyLimit,
      },
    });

    revalidatePath("/settings");
  };

  return (
    <div className="flex h-dvh w-full bg-gray-50">
      <SideBar currentPath="/settings" />

      <div className="flex flex-1 flex-col gap-6 p-5 md:p-10 lg:p-20">
        <h1 className="text-[clamp(1.25rem,2vw,2.25rem)] font-bold">
          Settings Page
        </h1>

        <form action={saveSettings}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            <LimitMessage dailyLimit={user?.dailyLimit ?? null} />

            <SpoilUnreadMessages />
            <DisableLink initialValue={user?.isDisabled} userId={userId} />
          </div>

          <SaveSettingsButton />
        </form>
      </div>
    </div>
  );
};

export default page;
