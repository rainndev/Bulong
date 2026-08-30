import filipinoBadwords from "filipino-badwords-list";
import englishProfanityWords from "@/data/english-profanity";

/**
 * Bilingual profanity detection (Filipino + English).
 *
 * Filipino list: jromest/filipino-badwords-list (npm)
 * English list: censor-text/profanity-list (vendored wordlist)
 *
 * Matching strategy: word-boundary token matching over normalized text,
 * so "tanga" is flagged but unrelated substrings don't false-positive
 * (avoids the Scunthorpe problem). Evasion handling:
 * - leetspeak (sh1t, b0bo, put@)
 * - symbols inside words (f.u.c.k -> fuck)
 * - spaced-out single letters (p u t a -> puta)
 * Multi-word Filipino phrases (e.g. "putang ina") match on collapsed text.
 */

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[4@]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[\u2019'`]/g, "")
    .replace(/([a-z])[^a-z\s]+(?=[a-z])/g, "$1")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const filipinoWords = filipinoBadwords.array;

const filipinoPhrases = filipinoWords
  .filter((word) => word.includes(" "))
  .map((phrase) => normalize(phrase))
  .filter(Boolean);

const filipinoSingle = filipinoWords
  .filter((word) => !word.includes(" "))
  .map((word) => normalize(word))
  .filter(Boolean);

const singleWordSet = new Set([...filipinoSingle, ...englishProfanityWords]);

const joinSingleLetterRuns = (tokens: string[]): string[] => {
  const candidates: string[] = [];
  let run: string[] = [];

  const flush = () => {
    if (run.length >= 3) candidates.push(run.join(""));
    run = [];
  };

  for (const token of tokens) {
    if (token.length === 1) {
      run.push(token);
    } else {
      flush();
    }
  }
  flush();

  return candidates;
};

export const containsProfanity = (text: string): boolean => {
  const normalized = normalize(text);

  if (!normalized) return false;

  const tokens = normalized.split(" ");

  if (tokens.some((token) => singleWordSet.has(token))) return true;

  const spacedCandidates = joinSingleLetterRuns(tokens);
  if (spacedCandidates.some((candidate) => singleWordSet.has(candidate))) {
    return true;
  }

  return filipinoPhrases.some((phrase) => normalized.includes(phrase));
};

export const findProfanity = (...texts: string[]): boolean =>
  texts.some((text) => containsProfanity(text));
