import { deletePost, PostType } from "@/lib/actions/post";
import { motion, AnimatePresence } from "motion/react";
import { FaFacebook } from "react-icons/fa";
import { PiSnapchatLogoFill } from "react-icons/pi";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { BiLogoInstagramAlt } from "react-icons/bi";

type BottomNavProps = {
  isOpen: boolean;
  onClose: () => void;
  post: PostType | undefined;
  setDisplayedPosts: Dispatch<SetStateAction<PostType[]>>;
};

export type SocmedTypes = {
  name: string;
  shortName: string;
  icon: IconType;
};

export const socmedOptions: SocmedTypes[] = [
  {
    name: "Facebook",
    shortName: "FB",
    icon: FaFacebook,
  },

  {
    name: "Instagram",
    shortName: "IG",
    icon: BiLogoInstagramAlt,
  },

  {
    name: "Snapchat",
    shortName: "SNAP",
    icon: PiSnapchatLogoFill,
  },
];

export default function BottomNav({
  isOpen,
  onClose,
  post,
  setDisplayedPosts,
}: BottomNavProps) {
  const [selectedSocmed, setSelectedSocmed] = useState<SocmedTypes>(
    socmedOptions[0],
  );

  const handlePostDelete = async () => {
    const isSuccess = await deletePost(post?.id);
    if (isSuccess) {
      onClose();
      setDisplayedPosts((prev) => prev.filter((data) => data.id != post?.id));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="text-[#242731] md:hidden">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed right-0 bottom-0 left-0 z-50 flex h-[95%] flex-col rounded-t-3xl bg-white p-5"
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
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <div className="mb-10 flex w-full items-center justify-center">
              <div className="flex w-fit justify-center gap-5 rounded-full bg-violet-100 p-3 px-8 text-2xl">
                {socmedOptions.map((data) => {
                  const Icon = data.icon;

                  return (
                    <Icon
                      className={`${selectedSocmed.shortName === data.shortName && "rounded-full bg-violet-300 p-0.5 transition-all ease-in-out"}`}
                      onClick={() => setSelectedSocmed(data)}
                      key={data.shortName}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-center text-xl font-bold antialiased">
              {post?.title || "No title"}
            </p>

            <div className="mt-5 mb-4 flex-1 rounded-2xl bg-violet-50 p-5 antialiased">
              <p className="text-sm text-gray-700">{post?.content}</p>
            </div>

            <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-4 text-center text-sm font-semibold text-white">
              <span>Share to</span>
              {<selectedSocmed.icon className="text-xl" />}
            </div>
            <div
              onClick={() => handlePostDelete()}
              className="mt-2 mb-5 w-full rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-0.5 text-center text-sm font-semibold text-white"
            >
              <div className="item-c flex w-full justify-center gap-2 rounded-full bg-white p-3">
                <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
                  Delete Message
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
