import { useEffect, useState } from "react";

export type Lang = "en" | "kn";

const LANG_KEY = "namma-lang";
const BADGE_KEY = "namma-badges";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  return ((localStorage.getItem(LANG_KEY) as Lang) || "en");
}
export function setLang(l: Lang) {
  localStorage.setItem(LANG_KEY, l);
  window.dispatchEvent(new Event("namma-lang-change"));
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(getLang());
  useEffect(() => {
    const onChange = () => setLangState(getLang());
    window.addEventListener("namma-lang-change", onChange);
    return () => window.removeEventListener("namma-lang-change", onChange);
  }, []);
  return [lang, (l) => setLang(l)];
}

export function getBadges(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BADGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function awardBadge(heroId: string) {
  const list = getBadges();
  if (!list.includes(heroId)) {
    list.push(heroId);
    localStorage.setItem(BADGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("namma-badges-change"));
  }
}

export function useBadges(): string[] {
  const [b, setB] = useState<string[]>(getBadges());
  useEffect(() => {
    const onChange = () => setB(getBadges());
    window.addEventListener("namma-badges-change", onChange);
    return () => window.removeEventListener("namma-badges-change", onChange);
  }, []);
  return b;
}

export const t = {
  en: {
    appName: "Namma-Kathey",
    tagline: "Stories of Karnataka's Heroes",
    chooseDistrict: "Choose a District",
    heroes: "Heroes",
    readStory: "Read Story",
    next: "Next",
    prev: "Back",
    listen: "Listen",
    stop: "Stop",
    startQuiz: "Start Quiz",
    quiz: "Quiz",
    correct: "Correct! 🎉",
    wrong: "Try again",
    finish: "Finish",
    yourScore: "Your Score",
    earnBadge: "Earn Heritage Badge",
    badgeEarned: "Heritage Badge Earned!",
    viewMemorial: "Visit Memorial",
    memorial: "Memorial",
    openMaps: "Open in Maps",
    badges: "My Badges",
    noBadges: "No badges yet. Read a story and complete a quiz!",
    home: "Home",
    backHome: "Home",
    page: "Page",
  },
  kn: {
    appName: "ನಮ್ಮ-ಕಥೆ",
    tagline: "ಕರ್ನಾಟಕದ ವೀರರ ಕಥೆಗಳು",
    chooseDistrict: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    heroes: "ವೀರರು",
    readStory: "ಕಥೆ ಓದಿ",
    next: "ಮುಂದೆ",
    prev: "ಹಿಂದೆ",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    startQuiz: "ರಸಪ್ರಶ್ನೆ ಆರಂಭಿಸಿ",
    quiz: "ರಸಪ್ರಶ್ನೆ",
    correct: "ಸರಿ! 🎉",
    wrong: "ಪ್ರಯತ್ನಿಸಿ",
    finish: "ಮುಗಿಸಿ",
    yourScore: "ನಿಮ್ಮ ಅಂಕ",
    earnBadge: "ಪರಂಪರೆ ಪದಕ ಪಡೆಯಿರಿ",
    badgeEarned: "ಪರಂಪರೆ ಪದಕ ಸಿಕ್ಕಿತು!",
    viewMemorial: "ಸ್ಮಾರಕ ನೋಡಿ",
    memorial: "ಸ್ಮಾರಕ",
    openMaps: "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ",
    badges: "ನನ್ನ ಪದಕಗಳು",
    noBadges: "ಇನ್ನೂ ಪದಕಗಳಿಲ್ಲ. ಕಥೆ ಓದಿ ರಸಪ್ರಶ್ನೆ ಮುಗಿಸಿ!",
    home: "ಮುಖಪುಟ",
    backHome: "ಮುಖಪುಟ",
    page: "ಪುಟ",
  },
} as const;
