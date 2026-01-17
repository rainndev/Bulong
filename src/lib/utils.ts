import { PostType } from "@/types/post.types";
import { toPng } from "html-to-image";

export const hideMessage = (text: string | null, revealed: boolean) => {
  if (!text) return "";
  const words = text.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return revealed ? text : firstWord + " " + "*".repeat(rest.length);
};

export const downloadOrShareImage = async (
  post: PostType | undefined,
  cardRef: React.RefObject<HTMLDivElement | null>,
  setCapture: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!post || !cardRef.current) return;

  setCapture(true);

  await new Promise((r) => requestAnimationFrame(r));

  try {
    const dataUrl = await toPng(cardRef.current, {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
    });

    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], "message.png", { type: "image/png" });

    if (navigator.share) {
      try {
        await navigator.share({
          files: [file],
          title: "Share Image",
          text: "Check out this post!",
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // Desktop fallback: download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "message.png";
      link.click();
    }
  } catch (err) {
    console.error("Failed to convert/share image", err);
  } finally {
    setCapture(false);
  }
};
