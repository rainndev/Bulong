import BrandMark from "@/components/BrandMark";
import { PostType } from "@/types/post.types";
import { SocmedTypes } from "@/types/socmed.types";

export type ShareRatio = "1:1" | "4:3" | "16:9" | "9:16";

const RATIO_CONFIG: Record<
  ShareRatio,
  { width: number; height: number; contentWidth: number }
> = {
  "1:1": { width: 640, height: 640, contentWidth: 400 },
  "4:3": { width: 720, height: 540, contentWidth: 460 },
  "16:9": { width: 800, height: 450, contentWidth: 520 },
  "9:16": { width: 480, height: 854, contentWidth: 360 },
};

export const SHARE_RATIOS: ShareRatio[] = ["1:1", "4:3", "16:9", "9:16"];

type ShareCardProps = {
  post: PostType;
  socmed: SocmedTypes;
  /** Site origin used for the short link pill (e.g. bulong.app). */
  origin?: string;
  /** Recipient's handle (without the @) shown at the end of the link. */
  handle?: string;
  /** Export aspect ratio — the canvas resizes, content stays centered. */
  ratio?: ShareRatio;
};

const ShareCard = ({
  post,
  socmed,
  origin,
  handle,
  ratio = "1:1",
}: ShareCardProps) => {
  const SocmedIcon = socmed.icon;
  const host = origin ? new URL(origin).host : "bulong.app";
  const link = handle ? `${host}/@${handle}` : host;

  const { width, height, contentWidth } = RATIO_CONFIG[ratio];

  return (
    <div
      className="sketch-grid font-fredoka flex items-center justify-center bg-[#fdfaf2] text-[#1f1c14]"
      style={{ width, height }}
    >
      {/* fixed-size content column, centered on the expanded canvas */}
      <div className="flex flex-col gap-4 p-3" style={{ width: contentWidth }}>
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandMark size={30} className="shrink-0" />
            <span className="text-lg font-bold">Bulong</span>
          </div>
          <SocmedIcon className="text-2xl text-[#1f1c14]" />
        </div>

        {/* message */}
        <div className="rounded-2xl border-2 border-[#1f1c14] bg-white p-5 shadow-[4px_4px_0_#1f1c14]">
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
    </div>
  );
};

export default ShareCard;
