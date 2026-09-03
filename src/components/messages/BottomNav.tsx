import AnonymousInfoTags from "@/components/AnonymousInfoTags";
import ShareCard, {
  SHARE_RATIOS,
  type ShareRatio,
} from "@/components/messages/ShareCard";
import { socmedOptions } from "@/constants/socmed-options";
import { deletePost } from "@/lib/actions/post";
import { downloadImage } from "@/lib/utils";
import { PostType } from "@/types/post.types";
import { SocmedTypes } from "@/types/socmed.types";
import { AnimatePresence, motion } from "motion/react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const subscribe = () => () => {};

type BottomNavProps = {
  isOpen: boolean;
  onClose: () => void;
  post: PostType | null;
  setDisplayedPosts: Dispatch<SetStateAction<PostType[]>>;
  userName: string;
};

export default function BottomNav({
  isOpen,
  onClose,
  post,
  setDisplayedPosts,
  userName,
}: BottomNavProps) {
  const [selectedSocmed, setSelectedSocmed] = useState<SocmedTypes>(
    socmedOptions[0],
  );
  const [selectedRatio, setSelectedRatio] = useState<ShareRatio>("1:1");

  const cardRefs = useRef<Record<ShareRatio, HTMLDivElement | null>>({
    "1:1": null,
    "4:3": null,
    "9:16": null,
    "16:9": null,
  });

  const origin = useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => "",
  );

  const handleDownload = () => {
    if (!post) return;
    const node = cardRefs.current[selectedRatio];
    if (node) {
      downloadImage(post, { current: node } as RefObject<HTMLDivElement | null>);
    }
  };

  const handlePostDelete = async () => {
    if (!post) return;

    const isSuccess = await deletePost(post.id);
    if (isSuccess) {
      onClose();
      setDisplayedPosts((prev) => prev.filter((data) => data.id != post.id));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && post && (
        <div className="text-[#171717]">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-[#1f1c14]/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom sheet (mobile) / centered modal (desktop) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={post.title || "Message"}
            className="fixed right-0 bottom-0 left-0 z-50 flex h-[92%] flex-col rounded-t-3xl border-t-2 border-[#1f1c14] bg-[#fdfaf2] p-5 md:top-1/2 md:bottom-auto md:left-1/2 md:h-auto md:max-h-[85vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border-2 md:shadow-[8px_8px_0_#1f1c14]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.y > 120) {
                onClose();
              }
            }}
          >
            {/* drag handle */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#1f1c14]/20" />

            {/* share target picker */}
            <div className="mb-6 flex w-full items-center justify-center">
              <div className="flex w-fit justify-center gap-5 rounded-full border-2 border-[#1f1c14] bg-white p-3 px-8 text-2xl">
                {socmedOptions.map((data) => {
                  const Icon = data.icon;

                  return (
                    <Icon
                      className={`${selectedSocmed.shortName === data.shortName && "cursor-pointer rounded-full bg-[#a3e635] p-0.5 transition-all ease-in-out"}`}
                      onClick={() => setSelectedSocmed(data)}
                      key={data.shortName}
                    />
                  );
                })}
              </div>
            </div>

            <p className="font-kalam mb-6 line-clamp-2 text-center text-lg leading-snug font-bold break-words antialiased md:text-xl">
              {post.title || "No title"}
            </p>
            <AnonymousInfoTags data={post} />
            <div className="mt-1 mb-4 min-h-0 flex-1 overflow-y-auto rounded-xl border-2 border-[#1f1c14] bg-white p-5 break-words antialiased">
              <span
                aria-hidden="true"
                className="font-kalam mb-2 block text-4xl leading-none font-bold text-[#65a30d]"
              >
                &ldquo;
              </span>
              <p className="font-kalam -mt-4 pl-6 text-sm leading-relaxed font-medium break-words text-[#1f1c14]/80">
                {post.content}
              </p>
              <p className="font-kalam mt-3 text-right text-xs font-bold text-[#1f1c14]/50">
                — anonymous
              </p>
            </div>

            {/* export ratio picker */}
            <div className="mb-3 flex w-full items-center justify-center gap-2">
              {SHARE_RATIOS.map((ratio) => {
                const isActive = ratio === selectedRatio;

                return (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setSelectedRatio(ratio)}
                    aria-pressed={isActive}
                    className={`cursor-pointer rounded-full border-2 border-[#1f1c14] px-3 py-1.5 text-xs font-bold transition-all duration-100 ${
                      isActive
                        ? "-rotate-2 bg-[#a3e635] text-[#1f1c14] shadow-[2px_2px_0_#1f1c14]"
                        : "bg-white text-[#1f1c14]/60 hover:text-[#1f1c14]"
                    }`}
                  >
                    {ratio}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1f1c14] bg-[#a3e635] p-4 text-center text-sm font-bold shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span>Download Image</span>
              <selectedSocmed.icon className="text-xl" />
            </button>
            <div
              onClick={() => handlePostDelete()}
              className="mt-2 mb-5 w-full cursor-pointer rounded-full border-2 border-[#1f1c14] bg-white p-3 text-center text-sm font-bold transition-colors hover:bg-[#ff5e3a] hover:text-white active:translate-y-0.5"
            >
              Delete Message
            </div>
          </motion.div>

          {/* Off-screen share cards — one per ratio, captured for download.
              Each wrapper shrink-wraps (w-fit) so the capture is exactly
              the card's own dimensions with no trailing empty space. */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 -translate-x-[9999px]"
          >
            {SHARE_RATIOS.map((ratio) => (
              <div
                key={ratio}
                ref={(node) => {
                  cardRefs.current[ratio] = node;
                }}
                className="w-fit"
              >
                {isOpen && post && (
                  <ShareCard
                    post={post}
                    socmed={selectedSocmed}
                    origin={origin}
                    handle={userName}
                    ratio={ratio}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
