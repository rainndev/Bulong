"use client";

import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { markAsReadPost, searchPost } from "@/lib/actions/post";
import BottomNav, { socmedOptions, SocmedTypes } from "@/components/BottomNav";
import { hideMessage } from "@/lib/utils";
import { FaTrash } from "react-icons/fa";
import { deletePost } from "@/lib/actions/post";
import NoSelectedMessage from "@/components/NoSelectedMessage";
import { motion } from "motion/react";
import AnonymousInfoTags from "@/components/AnonymousInfoTags";
import { PostType } from "@/types/post.types";

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
  const [selectedMessage, setSelectedMessage] =
    useState<PostType>(initialPostData);

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

  const markAsRead = async (data: PostType) => {
    if (data.isRead) return;

    const success = await markAsReadPost(data.id);

    if (success) {
      setDisplayedPosts((prev) =>
        prev.map((post) =>
          post.id === data.id ? { ...post, isRead: true } : post,
        ),
      );
    }
  };

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
    <main className="flex h-dvh w-full flex-row overflow-hidden bg-gray-50 text-black">
      <SideBar currentPath="/messages" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div>
          <h1 className="w-full p-10 pb-5 text-center text-xl font-semibold md:text-start md:text-2xl">
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
                className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-10 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-4 md:pl-9"
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
                    markAsRead(data);
                  }}
                  className={`${
                    selectedMessage?.id === data.id &&
                    "border-l-violet-950 bg-violet-100"
                  } cursor-pointer rounded-tr-xl rounded-br-xl border border-l-4 border-violet-200 p-4 transition-colors hover:bg-violet-100 md:p-5`}
                >
                  <span className="text-md block truncate font-medium antialiased">
                    {hideMessage(data.title, data.isRead)}
                  </span>
                  <p className="truncate text-xs text-gray-600 antialiased md:text-sm">
                    {hideMessage(data.content, data.isRead)}
                  </p>
                </li>
              ))}

              <li className="invisible h-20" />
            </ul>
          </div>

          {/* specific message */}
          {selectedMessage?.id === "example-id" ? (
            <NoSelectedMessage />
          ) : (
            <div className="hidden flex-1 overflow-y-auto rounded-2xl border border-violet-200 bg-white p-10 md:flex md:flex-col">
              <div className="flex w-full justify-between">
                <div className="mb-10 flex w-full items-center justify-start">
                  <div className="flex w-fit justify-center gap-5 rounded-full bg-violet-100 p-3 px-8 text-2xl lg:text-3xl">
                    {socmedOptions.map((data) => {
                      const Icon = data.icon;

                      return (
                        <Icon
                          className={`${selectedSocmed.shortName === data.shortName && "cursor-pointer rounded-full bg-violet-300 p-1 transition-all ease-in-out"}`}
                          onClick={() => setSelectedSocmed(data)}
                          key={data.shortName}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-10 flex items-center rounded-full bg-violet-200 transition-colors ease-in-out hover:bg-violet-100 hover:text-violet-900 active:bg-violet-100 active:text-violet-900">
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

              <div className="text-md text-md mt-4 flex-1 rounded-2xl bg-violet-50 whitespace-pre-wrap md:p-5 md:text-lg lg:p-10">
                <p>{selectedMessage?.content}</p>
              </div>
            </div>
          )}

          <BottomNav
            isOpen={isDialogShowing}
            onClose={() => setDialogShowing(false)}
            post={selectedMessage}
            setDisplayedPosts={setDisplayedPosts}
          />
        </div>
      </div>
    </main>
  );
};

export default MessagesClient;
