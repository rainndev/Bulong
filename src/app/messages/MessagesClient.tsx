"use client";

import NavigationBar from "@/components/NavigationBar";
import { useEffect, useState } from "react";
import { PostType } from "../dashboard/page";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { searchPost } from "@/lib/actions/post";

interface MessagesClientProps {
  posts: PostType[];
}

const MessagesClient = ({ posts }: MessagesClientProps) => {
  const [selectedMessage, setSelectedMessage] = useState<PostType | undefined>(
    posts.length > 0 ? posts[0] : undefined
  );
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>(posts);
  const [search, setSearch] = useState("");
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
    <main className="flex bg-gray-50 text-black w-full rounded-3xl h-full overflow-hidden">
      <NavigationBar currentPath="/messages" />

      <div className="flex flex-col w-full h-full">
        <div>
          <h1 className="text-2xl font-bold p-10 pb-5">Messages</h1>
        </div>

        {/* list of message */}
        <div className="flex flex-1 min-h-0 px-2 pb-10 gap-5 ">
          <div className="w-100 flex flex-col h-full ">
            <div className="relative w-full">
              {/* icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <IoSearch className="h-4 w-4 text-black" />
              </div>
              {/* input search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-md"
              />
            </div>
            <ul className="space-y-2 overflow-y-auto h-full  mt-5 hide-scrollbar">
              {/* show this if no message found */}
              {displayedPosts.length < 1 && (
                <div className="w-full  flex justify-center text-sm text-gray-500 ">
                  No message found
                </div>
              )}

              {displayedPosts.map((data) => (
                <li
                  key={data.id}
                  onClick={() => setSelectedMessage(data)}
                  className={`${
                    selectedMessage?.id === data.id
                      ? "bg-violet-100  border-l-violet-950 "
                      : ""
                  } hover:bg-violet-100 border-l-4 transition-colors border border-violet-200 rounded-tr-xl rounded-br-xl p-5 cursor-pointer`}
                >
                  <span className="font-semibold block">{data.title}</span>
                  <p className="truncate text-sm text-gray-600">
                    {data.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* specific message */}
          <div className="bg-violet-50 rounded-2xl flex-1 h-full p-10 overflow-y-auto">
            <h1 className="text-xl font-bold">{selectedMessage?.title}</h1>
            <p className="mt-4 whitespace-pre-wrap">
              {selectedMessage?.content}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MessagesClient;
