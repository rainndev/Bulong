import { auth } from "@/lib/auth";
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
    <div className="flex h-dvh flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold">Settings Page</h1>
      <form action={saveSettings}>
        <div>
          <p className="">Limit Message</p>
          <input
            type="number"
            name="dailyLimit"
            className="no-spinner md:text-md mt-5 w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
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
  );
};

export default page;
