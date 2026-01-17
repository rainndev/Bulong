import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const saveSettings = async (form: FormData) => {
    "use server";
    const dailyLimit = parseInt(form.get("dailyLimit") as string, 10);

    // Update daily limit in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dailyLimit,
      },
    });
  };

  return (
    <div className="flex h-dvh w-full bg-violet-50">
      <SideBar currentPath="/settings" />

      <div className="flex w-full flex-col gap-6 p-5 md:p-10 lg:p-20">
        <h1 className="text-[clamp(1.25rem,2vw,2.25rem)] font-bold">
          Settings Page
        </h1>

        <form action={saveSettings}>
          <div className="flex flex-col gap-4 rounded-2xl bg-violet-100 p-5 md:gap-6 md:p-7 lg:p-10">
            <p className="text-[clamp(1rem,2vw,1.125rem)]">Limit Message</p>
            <input
              type="number"
              name="dailyLimit"
              className="no-spinner md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
              placeholder="ex: 10"
            />
          </div>

          <button
            type="submit"
            className="md:text-md mt-5 flex w-full cursor-pointer justify-center rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors ease-in-out hover:bg-violet-400 md:p-5"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
