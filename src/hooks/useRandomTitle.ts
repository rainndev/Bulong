import { useEffect, useState } from "react";
import { playfulTitles } from "@/constants/titleMessage";

export function useRandomTitle(username: string) {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * playfulTitles.length);
    const selectedTitle = playfulTitles[randomIndex].replace(
      "{username}",
      username,
    );
    setTitle(selectedTitle);
  }, [username]);

  return title;
}
