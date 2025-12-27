export const hideMessage = (text: string | null, revealed: boolean) => {
  if (!text) return "";
  const words = text.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return revealed ? text : firstWord + " " + "*".repeat(rest.length);
};
