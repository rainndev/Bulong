"use client";

import BottomNav from "@/components/messages/BottomNav";
import MessageCard from "@/components/messages/MessageCard";
import SideBar from "@/components/SideBar";
import { useDebounce } from "@/hooks/useDebounce";
import { markAsReadPost, searchPost } from "@/lib/actions/post";
import { PostType } from "@/types/post.types";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface MessagesClientProps {
  posts: PostType[];
  userId: string;
}

const MessagesClient = ({ posts, userId }: MessagesClientProps) => {
  const [selectedMessage, setSelectedMessage] = useState<PostType | null>(null);
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
      const searchedPosts = await searchPost(debouncedSearch, userId);
      setDisplayedPosts(searchedPosts);
    };

    getSearchedPost();
  }, [debouncedSearch]);

  const openMessage = async (post: PostType) => {
    setSelectedMessage(post);
    setDialogShowing(true);

    if (post.isRead) return;

    const success = await markAsReadPost(post.id);

    if (success) {
      setDisplayedPosts((prev) =>
        prev.map((data) =>
          data.id === post.id ? { ...data, isRead: true } : data,
        ),
      );
      setSelectedMessage((prev) =>
        prev && prev.id === post.id ? { ...prev, isRead: true } : prev,
      );
    }
  };

  const unreadCount = displayedPosts.filter((post) => !post.isRead).length;

  return (
    <main className="font-fredoka flex h-dvh w-full overflow-hidden bg-[#fafafa] text-[#171717]">
      <SideBar currentPath="/messages" />

      <div className="flex h-full w-full min-w-0 flex-1 flex-col">
        <div className="sketch-grid flex flex-1 flex-col overflow-y-auto bg-[#fdfaf2] pt-6 pb-28 md:pb-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-5 md:flex-row md:items-center md:justify-between md:px-0">
            <h1 className="text-xl font-bold tracking-[-0.04em] md:text-2xl">
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-2 py-0.5 align-middle text-xs font-bold">
                  {unreadCount} new
                </span>
              )}
            </h1>

            <div className="relative w-full md:max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <IoSearch className="h-4 w-4 text-[#1f1c14]/40" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full rounded-full border-2 border-[#1f1c14] bg-white py-2.5 pr-4 pl-10 text-sm font-bold transition-all duration-200 placeholder:font-normal placeholder:text-[#1f1c14]/30 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none"
              />
            </div>
          </div>
          {displayedPosts.length === 0 ? (
            <div className="mx-auto flex w-full max-w-7xl justify-center py-16">
              <div className="rotate-1 rounded-lg border-2 border-[#1f1c14] bg-white p-8 text-center shadow-[6px_6px_0_#1f1c14]">
                <p className="text-lg font-bold">No messages found</p>
                <p className="mt-1 text-sm font-medium text-[#1f1c14]/60">
                  Share your link to start receiving anonymous messages.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-2 pt-6 pb-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post, index) => (
                <MessageCard
                  key={post.id}
                  post={post}
                  index={index}
                  onOpen={openMessage}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav
        isOpen={isDialogShowing}
        onClose={() => setDialogShowing(false)}
        post={selectedMessage}
        setDisplayedPosts={setDisplayedPosts}
      />
    </main>
  );
};

export default MessagesClient;
