import { useSettingsContext } from "@/context/SettingsContext";
import { markAsReadPost } from "@/lib/actions/post";
import { hideMessage } from "@/lib/utils";
import { PostType } from "@/types/post.types";
import { Dispatch, SetStateAction } from "react";

type ListMessageProps = {
  displayedPosts: PostType[];
  setDialogShowing: Dispatch<SetStateAction<boolean>>;
  setDisplayedPosts: Dispatch<SetStateAction<PostType[]>>;
  selectedMessage: PostType | null;
  setSelectedMessage: Dispatch<SetStateAction<PostType | null>>;
};

const ListMessage = ({
  displayedPosts,
  setDialogShowing,
  setDisplayedPosts,
  selectedMessage,
  setSelectedMessage,
}: ListMessageProps) => {
  const { isHideUnreadMessage } = useSettingsContext();

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

  return (
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
            {isHideUnreadMessage
              ? hideMessage(data.title, data.isRead)
              : data.title}
          </span>
          <p className="truncate text-xs text-gray-600 antialiased md:text-sm">
            {isHideUnreadMessage
              ? hideMessage(data.content, data.isRead)
              : data.content}
          </p>
        </li>
      ))}

      <li className="invisible h-20" />
    </ul>
  );
};

export default ListMessage;
