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
    <main className="flex bg-gray-50 text-black w-full rounded-3xl h-full overflow-hidden">
      <NavigationBar currentPath="/messages" />

      <div className="flex flex-col w-full h-full">
        <div>
          <h1 className="text-2xl font-bold p-10 pb-5">Messages</h1>
        </div>

        <div className="flex flex-1 min-h-0 px-2 pb-10 gap-5">
          <div className="w-100 flex flex-col h-full">
            <ul className="space-y-2 overflow-y-auto h-full pr-2">
              {posts.map((data) => (
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
