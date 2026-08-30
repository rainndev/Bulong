import { PushPin, SafetyPin } from "@/components/pins";
import { useSettingsContext } from "@/context/SettingsContext";
import { hideMessage } from "@/lib/utils";
import { PostType } from "@/types/post.types";

type MessageCardProps = {
  post: PostType;
  index: number;
  onOpen: (post: PostType) => void;
};

const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
const pinPositions = [
  "-top-4 left-6",
  "-top-4 right-8",
  "-top-5 left-10",
  "-top-4 right-6",
];

const MessageCard = ({ post, index, onOpen }: MessageCardProps) => {
  const { isHideUnreadMessage } = useSettingsContext();
  const isUnread = !post.isRead;

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      className={`relative block w-full cursor-pointer rounded-lg border-2 border-[#1f1c14] ${
        isUnread ? "bg-[#a3e635]" : "bg-white"
      } ${rotations[index % rotations.length]} p-5 pt-7 text-left shadow-[6px_6px_0_#1f1c14] transition-transform duration-100 hover:scale-[1.02] hover:rotate-0 focus-visible:ring-4 focus-visible:ring-[#a3e635]/60 focus-visible:outline-none`}
    >
      <span
        aria-hidden="true"
        className={`absolute ${pinPositions[index % pinPositions.length]} -rotate-12`}
      >
        {index % 3 === 0 ? <SafetyPin /> : <PushPin />}
      </span>

      {isUnread && (
        <span className="absolute top-3 right-3 rounded-full border-2 border-[#1f1c14] bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
          new
        </span>
      )}

      <h3 className="font-fredoka mb-1 line-clamp-1 pr-10 text-xl leading-snug font-semibold text-[#171717] antialiased">
        {isHideUnreadMessage
          ? hideMessage(post.title, post.isRead)
          : post.title}
      </h3>
      <p className="font-kalam line-clamp-3 text-sm leading-snug font-medium text-[#1f1c14]/70">
        &quot;
        {isHideUnreadMessage
          ? hideMessage(post.content, post.isRead)
          : post.content}
        &quot;
      </p>
      <p className="mt-3 text-right text-xs font-bold text-[#1f1c14]/50">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </button>
  );
};

export default MessageCard;
