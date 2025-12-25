"use client";

import NavigationBar from "@/components/NavigationBar";
import { useEffect, useState } from "react";
import { PostType } from "../dashboard/page";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { searchPost } from "@/lib/actions/post";
import { AnimatePresence, motion } from "motion/react";
import BottomNav from "@/components/BottomNav";

interface MessagesClientProps {
  posts: PostType[];
}

const MessagesClient = ({ posts }: MessagesClientProps) => {
  const [selectedMessage, setSelectedMessage] = useState<PostType | undefined>(
    posts.length > 0 ? posts[0] : undefined,
  );
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>(posts);
  const [search, setSearch] = useState("");
  const [isDialogShowing, setDialogShowing] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const getSearchedPost = async () => {
      if (!debouncedSearch) {
        setDisplayedPosts(posts);
        return;
      }
      const searchedPosts = await searchPost(debouncedSearch);
      setDisplayedPosts(searchedPosts);
    };

    getSearchedPost();
  }, [debouncedSearch]);

  return (
    <main className="flex h-full w-full overflow-hidden bg-gray-50 text-black">
      <NavigationBar currentPath="/messages" />

      <div className="flex h-full w-full flex-col">
        <div>
          <h1 className="p-10 pb-5 text-2xl font-bold">Messages</h1>
        </div>

        <div className="flex min-h-0 flex-1 gap-5 px-2 pb-10">
          <div className="flex h-full w-full flex-col md:w-100">
            <div className="relative w-full">
              {/* icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <IoSearch className="h-4 w-4 text-black" />
              </div>
              {/* input search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="text-md w-full rounded-full border border-violet-200 bg-white py-3 pr-4 pl-11 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <ul className="hide-scrollbar mt-5 h-full space-y-2 overflow-y-auto">
              {/* show this if no message found */}
              {displayedPosts.length < 1 && (
                <div className="flex w-full justify-center text-sm text-gray-500">
                  No message found
                </div>
              )}

              {/* list of message */}
              {displayedPosts.map((data) => (
                <li
                  key={data.id}
                  onClick={() => {
                    setDialogShowing(true);
                    setSelectedMessage(data);
                  }}
                  className={`${
                    selectedMessage?.id === data.id
                      ? "border-l-violet-950 bg-violet-100"
                      : ""
                  } cursor-pointer rounded-tr-xl rounded-br-xl border border-l-4 border-violet-200 p-5 transition-colors hover:bg-violet-100`}
                >
                  <span className="block font-semibold">{data.title}</span>
                  <p className="truncate text-sm text-gray-600">
                    {data.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* specific message */}

          <div className="fixed top-0 right-0 bottom-0 left-0 z-20 hidden h-full flex-1 overflow-y-auto rounded-2xl bg-violet-50 p-10 md:static md:block">
            <div className="flex w-full justify-end md:hidden">
              <button className="mb-10 rounded-2xl bg-violet-200 px-10 py-2 text-sm">
                close
              </button>
            </div>

            <h1 className="text-xl font-bold">{selectedMessage?.title}</h1>
            <p className="mt-4 whitespace-pre-wrap">
              {selectedMessage?.content}
            </p>
          </div>

          <BottomNav
            isOpen={isDialogShowing}
            onClose={() => setDialogShowing(false)}
            post={selectedMessage}
          />
        </div>
      </div>
    </main>
  );
};

export default MessagesClient;
