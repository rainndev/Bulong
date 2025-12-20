"use client";

import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";
import { PostType } from "../dashboard/page";

interface MessagesClientProps {
  posts: PostType[];
}

const MessagesClient = ({ posts }: MessagesClientProps) => {
  const [selectedMessage, setSelectedMessage] = useState<PostType>();

  return (
    <main className="flex items-center bg-gray-50 text-black w-full rounded-3xl h-screen">
      <NavigationBar currentPath="/messages" />

      <div className="w-full p-10 h-full">
        <h1 className="text-2xl font-bold">Messages</h1>

        <div className="flex h-full overflow-hidden mt-5 gap-5">
          {/* list of message */}
          <div className="min-w-sm h-full">
            <ul className="space-y-2 overflow-y-auto h-full pr-2">
              {posts.map((data) => (
                <li
                  onClick={() => setSelectedMessage(data)}
                  className="hover:bg-violet-100 transition-colors ease-in-out border border-violet-200 rounded-xl p-5 cursor-pointer"
                  key={data.id}
                >
                  <span>{data.title}</span>
                  <p className="truncate">{data.content}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* specific message */}
          <div className="bg-violet-50 rounded-2xl w-full p-10 overflow-y-auto">
            <h1 className="text-xl">{selectedMessage?.title}</h1>
            <p className="mt-2">{selectedMessage?.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MessagesClient;
