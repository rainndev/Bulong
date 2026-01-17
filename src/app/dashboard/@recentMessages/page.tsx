import { getRecentPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth/auth";
import { hideMessage } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";

const RecentMessages = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("completed");
    }, 2000);
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const userId = session?.user.id;
  const recentPost = await getRecentPost(userId, 4);

  return (
    <div className="h-full min-h-80 space-y-2 rounded-3xl border border-violet-200 bg-white p-6 text-[#242731] md:space-y-4">
      <h1 className="lg:text-md rounded-lg bg-violet-50 p-2 pl-3 text-xs font-medium text-[#242731]/50 md:pl-4 md:text-sm">
        Recent
      </h1>

      {recentPost.map((data) => (
        <div
          key={data.id}
          className="flex items-center gap-4 rounded-xl p-2 md:px-5"
        >
          <div>
            <FaEnvelope className="rotate-30 text-sm text-violet-950/40" />
          </div>

          <div className="flex min-w-0 flex-col text-sm">
            <h1 className="mb-1 truncate text-[clamp(1rem,2vw,1.125rem)] font-semibold antialiased">
              {hideMessage(data.title, data.isRead)}
            </h1>
            <p className="truncate text-[clamp(0.75remrem,2vw,0.875rem)] text-[#949494] antialiased">
              {hideMessage(data.content, data.isRead)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMessages;
