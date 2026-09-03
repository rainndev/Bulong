import BrandMark from "@/components/BrandMark";
import { PostType } from "@/types/post.types";
import { SocmedTypes } from "@/types/socmed.types";

type ShareCardProps = {
  post: PostType;
  socmed: SocmedTypes;
  /** Site origin used for the short link pill (e.g. bulong.app). */
  origin?: string;
  /** Recipient's handle (without the @) shown at the end of the link. */
  handle?: string;
};

const ShareCard = ({ post, socmed, origin, handle }: ShareCardProps) => {
  const SocmedIcon = socmed.icon;
  const host = origin ? new URL(origin).host : "bulong.app";
  const link = handle ? `${host}/@${handle}` : host;

  return (
    <div className="sketch-grid font-fredoka flex w-80 flex-col gap-4 rounded-xl border-2 border-[#1f1c14] bg-[#fdfaf2] p-6 text-[#1f1c14]">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrandMark size={30} className="shrink-0" />
          <span className="text-lg font-bold">Bulong</span>
        </div>
        <SocmedIcon className="text-2xl text-[#1f1c14]" />
      </div>

      {/* message */}
      <div className="rounded-xl border-2 border-[#1f1c14] bg-white p-5 shadow-[4px_4px_0_#1f1c14]">
        <p className="font-kalam mb-2 line-clamp-2 text-center text-base leading-snug font-bold break-words">
          {post.title || "No title"}
        </p>
        <span
          aria-hidden="true"
          className="font-kalam mb-1 block text-3xl leading-none font-bold text-[#65a30d]"
        >
          &ldquo;
        </span>
        <p className="font-kalam -mt-4 pl-5 text-sm leading-relaxed font-medium break-words text-[#1f1c14]/80">
          {post.content}
        </p>
        <p className="font-kalam mt-3 text-right text-xs font-bold text-[#1f1c14]/50">
          — anonymous
        </p>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between">
        <span className="font-kalam text-xs font-bold text-[#1f1c14]/50">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center justify-center rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-3 py-1 text-[8px] font-bold">
          {link}
        </span>
      </div>
    </div>
  );
};

export default ShareCard;
