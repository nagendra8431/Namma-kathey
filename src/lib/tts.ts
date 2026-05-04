// Lightweight TTS using browser SpeechSynthesis API.
import type { Lang } from "./store";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, lang: Lang, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stop();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "kn" ? "kn-IN" : "en-IN";
  u.rate = 0.9;
  u.pitch = 1.05;
  // try preferred voice
  const voices = window.speechSynthesis.getVoices();
  const match =
    voices.find((v) => v.lang?.toLowerCase().startsWith(u.lang.toLowerCase())) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(lang === "kn" ? "kn" : "en"));
  if (match) u.voice = match;
  u.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };
  currentUtterance = u;
  window.speechSynthesis.speak(u);
}

export function stop() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  currentUtterance = null;
}

export function isSpeaking() {
  return !!currentUtterance;
}
