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
    <div className="sketch-grid font-fredoka flex h-dvh w-full overflow-hidden bg-[#fdfaf2] text-[#1f1c14]">
      <SideBar currentPath="/settings" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto pt-6 pb-24 md:pb-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:px-5">
            <div>
              <h1 className="text-xl font-bold tracking-[-0.04em] md:text-2xl">
                Settings
              </h1>
              <p className="mt-0.5 text-xs font-bold text-[#1f1c14]/50">
                Manage how your anonymous inbox behaves
              </p>
            </div>

            <form action={saveSettings}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                <LimitMessage dailyLimit={user?.dailyLimit ?? null} />
                <SpoilUnreadMessages />
                <DisableLink initialValue={user?.isDisabled} userId={userId} />
              </div>

              <div className="mt-8 max-w-md">
                <SaveSettingsButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
