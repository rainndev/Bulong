"use client";

import AnonymousInfoTags from "@/components/AnonymousInfoTags";
import BottomNav from "@/components/messages/BottomNav";
import NoSelectedMessage from "@/components/NoSelectedMessage";
import SideBar from "@/components/SideBar";
import { socmedOptions } from "@/constants/socmed-options";
import { useDebounce } from "@/hooks/useDebounce";
import { deletePost, searchPost } from "@/lib/actions/post";
import { PostType } from "@/types/post.types";
import { SocmedTypes } from "@/types/socmed.types";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ListMessage from "./ListMessage";

interface MessagesClientProps {
  posts: PostType[];
  userId: string;
}

const initialPostData = {
  id: "example-id",
  title: "Nothing Selected",
  content: "Choose a message from the list to view its content.",
  published: false,
  authorId: "example-author",
  browser: null,
  region: null,
  country: null,
  device: null,
  OS: null,
  isRead: true,
  createdAt: new Date(),
  updatedAt: null,
};

const MessagesClient = ({ posts, userId }: MessagesClientProps) => {
  const [selectedMessage, setSelectedMessage] = useState<PostType | null>(
    initialPostData,
  );

  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>(posts);
  const [search, setSearch] = useState("");
  const [isDialogShowing, setDialogShowing] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const [selectedSocmed, setSelectedSocmed] = useState<SocmedTypes>(
    socmedOptions[0],
  );

  useEffect(() => {
    const getSearchedPost = async () => {
      if (!debouncedSearch) {
        setDisplayedPosts(posts);
        return;
      }
      const searchedPosts = await searchPost(debouncedSearch, userId);
      setDisplayedPosts(searchedPosts);
    };

    getSearchedPost();
  }, [debouncedSearch]);

  const handleDeletePost = async () => {
    const selectedPostId = selectedMessage?.id;

    if (!selectedPostId) return;

    const isSuccess = await deletePost(selectedPostId);

    if (isSuccess) {
      setDisplayedPosts((prev) =>
        prev.filter((data) => data.id != selectedPostId),
      );
      setSelectedMessage(initialPostData);
    }
  };

  return (
    <main className="flex h-dvh w-full flex-row overflow-hidden bg-[#fafafa] font-fredoka text-[#171717]">
      <SideBar currentPath="/messages" />

      <div className="mx-auto flex h-full w-full max-w-7xl min-w-0 flex-1 flex-col">
        <div>
          <h1 className="w-full p-6 pb-4 text-xl font-bold tracking-[-0.04em] md:p-10 md:pb-5 md:text-2xl">
            Messages
          </h1>
        </div>

        <div className="flex min-h-0 flex-1 gap-5 px-2 pb-10">
          <div className="flex h-full w-full shrink-0 flex-col md:w-80 lg:w-96">
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
                className="w-full rounded-lg border border-[#e5e5e5] bg-white p-3 pl-10 text-sm transition-colors duration-200 placeholder:text-[#a3a3a3] focus:border-[#65a30d] focus:ring-2 focus:ring-[#65a30d]/15 focus:outline-none md:p-3.5 md:pl-9"
              />
            </div>
            {/* list of messages */}
            <ListMessage
              displayedPosts={displayedPosts}
              setDialogShowing={setDialogShowing}
              setDisplayedPosts={setDisplayedPosts}
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
            />
          </div>

          {/* side message for desktop view */}
          {selectedMessage?.id === "example-id" || !selectedMessage ? (
            <NoSelectedMessage />
          ) : (
            <div className="hidden flex-1 overflow-y-auto rounded-xl border border-[#e5e5e5] bg-white p-10 md:flex md:flex-col">
              <div className="flex w-full justify-between">
                <div className="mb-10 flex w-full items-center justify-start">
                  <div className="flex w-fit justify-center gap-5 rounded-full bg-[#f5f5f5] p-3 px-8 text-2xl lg:text-3xl">
                    {socmedOptions.map((data) => {
                      const Icon = data.icon;

                      return (
                        <Icon
                          className={`${selectedSocmed.shortName === data.shortName && "cursor-pointer rounded-full bg-[#a3e635] p-1 transition-all ease-in-out"}`}
                          onClick={() => setSelectedSocmed(data)}
                          key={data.shortName}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-10 flex items-center rounded-full bg-[#f5f5f5] transition-colors ease-in-out hover:bg-[#efefef] hover:text-[#65a30d] active:bg-[#efefef] active:text-[#4d7c0f]">
                  <motion.button
                    initial={{
                      scale: 0.9,
                    }}
                    whileTap={{
                      scale: 0.7,
                    }}
                    onClick={() => handleDeletePost()}
                    className="cursor-pointer"
                  >
                    <FaTrash className="m-3 p-1 text-2xl lg:text-3xl" />
                  </motion.button>
                </div>
              </div>

              <h1 className="mb-10 text-center font-semibold md:text-xl lg:text-3xl">
                {selectedMessage?.title}
              </h1>

              {/* basic info of sender */}
              <AnonymousInfoTags data={selectedMessage} />

              <div className="mt-4 flex-1 whitespace-pre-wrap rounded-lg bg-[#f5f5f5] text-sm md:p-5 md:text-base lg:p-8">
                <p>{selectedMessage?.content}</p>
              </div>
            </div>
          )}

          {/* bottom nav message for mobile view */}
          <BottomNav
            isOpen={isDialogShowing}
            onClose={() => setDialogShowing(false)}
            post={selectedMessage ?? initialPostData}
            setDisplayedPosts={setDisplayedPosts}
          />
        </div>
      </div>
    </main>
  );
};

export default MessagesClient;
