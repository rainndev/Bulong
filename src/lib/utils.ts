import { toPng } from "html-to-image";
import { Dispatch, SetStateAction } from "react";
import { PostType } from "./actions/post";

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
  setCapture: Dispatch<SetStateAction<boolean>>,
) => {
  if (!post || !cardRef.current) return;
  setCapture(true);

  await new Promise((r) => requestAnimationFrame(r));

  const dataUrl = await toPng(cardRef.current, {
    quality: 1,
    pixelRatio: 3,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.download = "message.png";
  link.href = dataUrl;
  link.click();

  setCapture(false);
};
