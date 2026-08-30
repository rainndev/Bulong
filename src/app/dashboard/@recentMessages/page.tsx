import TitleContent from "@/components/dashboard/recent-messages/TitleContent";
import { getRecentPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";

const RecentMessages = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const userId = session?.user.id;
  const recentPost = await getRecentPost(userId, 4);

  return (
    <section className="flex min-h-72 flex-col rotate-1 rounded-lg border-2 border-[#1f1c14] bg-white p-3.5 shadow-[6px_6px_0_#1f1c14]">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-[13px] font-bold">Recent messages</h2>
        <Link
          href="/messages"
          className="text-[11px] font-bold text-[#1f1c14]/50 transition-colors hover:text-[#1f1c14]"
        >
          View all →
        </Link>
      </div>

      {recentPost.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="grid size-9 place-items-center rounded-lg border-2 border-[#1f1c14] bg-[#a3e635] text-[#1f1c14]">
            <FaEnvelope className="text-sm" />
          </span>
          <p className="text-xs font-bold text-[#1f1c14]/50">
            No messages yet — share your link to start receiving.
          </p>
        </div>
      ) : (
        recentPost.map((data) => (
          <div
            key={data.id}
            className="flex items-center gap-3 border-b-2 border-dashed border-[#1f1c14]/15 py-2.5 last:border-b-0"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg border-2 border-[#1f1c14] bg-[#a3e635] text-[#1f1c14]">
              <FaEnvelope className="text-xs" />
            </span>

            <TitleContent data={data} />

            <span className="ml-auto shrink-0 text-[11px] font-bold text-[#1f1c14]/40">
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        ))
      )}
    </section>
  );
};

export default RecentMessages;
