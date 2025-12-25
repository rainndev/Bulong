import { PostType } from "@/lib/actions/post";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: PostType | undefined;
};

export default function BottomNav({ isOpen, onClose, post }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
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
            className="fixed right-0 bottom-0 left-0 z-50 h-[95%] rounded-t-2xl bg-white p-5"
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

            <p className="text-center text-xl font-bold">
              {post?.title || "No title"}
            </p>

            <div className="mt-5 h-[90%] rounded-2xl bg-violet-50 p-5">
              <p className="text-sm text-gray-700">{post?.content}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
