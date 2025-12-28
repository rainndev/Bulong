import { getRecentPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { hideMessage } from "@/lib/utils";
import { headers } from "next/headers";
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
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const recentPost = await getRecentPost(userId, 4);

  return (
    <div>
      <div className="space-y-2 md:space-y-4">
        <h1 className="md:text-md rounded-lg bg-gray-50/5 p-2 pl-4 text-sm">
          Recent
        </h1>

        {recentPost.map((data) => (
          <div
            key={data.id}
            className="flex items-center gap-4 rounded-xl p-2 md:px-5"
          >
            <div>
              <FaEnvelope className="rotate-30 text-sm text-gray-50/40" />
            </div>

            <div className="flex min-w-0 flex-col text-sm">
              <h1 className="text-md mb-1 truncate font-semibold antialiased md:text-lg">
                {hideMessage(data.title, data.isRead)}
              </h1>
              <p className="truncate text-xs text-[#949494] antialiased md:text-sm">
                {hideMessage(data.content, data.isRead)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
