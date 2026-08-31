import { PostType } from "@/types/post.types";
import { clsx, type ClassValue } from "clsx";
import { toPng } from "html-to-image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hideMessage = (text: string | null, revealed: boolean) => {
  if (!text) return "";
  const words = text.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return revealed ? text : firstWord + " " + "*".repeat(rest.length);
};

export const downloadImage = async (
  post: PostType | undefined,
  cardRef: React.RefObject<HTMLDivElement | null>,
) => {
  if (!post || !cardRef.current) return;

  try {
    const dataUrl = await toPng(cardRef.current, {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "message.png";
    link.click();
  } catch (err) {
    console.error("Failed to download image", err);
  }
};
