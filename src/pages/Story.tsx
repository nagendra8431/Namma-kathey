import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { findHero } from "@/data/heroes";
import { useLang, t } from "@/lib/store";
import { speak, stop } from "@/lib/tts";
import { ChevronLeft, ChevronRight, Pause, Volume2, HelpCircle } from "lucide-react";

export default function Story() {
  const { heroId } = useParams();
  const [lang] = useLang();
  const tr = t[lang];
  const nav = useNavigate();
  const found = heroId ? findHero(heroId) : null;
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => stop(), []);
  useEffect(() => {
    stop();
    setPlaying(false);
  }, [idx, lang]);

  if (!found) return <Navigate to="/" replace />;
  const { hero } = found;
  const page = hero.pages[idx];
  const last = idx === hero.pages.length - 1;

  const togglePlay = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      speak(page.text[lang], lang, () => setPlaying(false));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6 pt-4">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>{hero.name[lang]}</span>
          <span>
            {tr.page} {idx + 1} / {hero.pages.length}
          </span>
        </div>

        <div className={`flex flex-1 flex-col items-center justify-center rounded-3xl ${page.bg} p-6 text-center text-primary-foreground shadow-warm`}>
          <div className="mb-4 grid h-32 w-32 place-items-center rounded-full bg-white/20 text-7xl shadow-inner">
            {page.emoji}
          </div>
          <p className="max-w-md text-lg font-bold leading-snug" style={{ minHeight: 120 }}>
            {page.text[lang]}
          </p>
          <Button
            onClick={togglePlay}
            size="lg"
            variant="secondary"
            className="mt-5 gap-2 rounded-full"
          >
            {playing ? <Pause /> : <Volume2 />}
            {playing ? tr.stop : tr.listen}
          </Button>
        </div>

        <div className="mt-1 flex h-2 gap-1">
          {hero.pages.map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="gap-1"
          >
            <ChevronLeft /> {tr.prev}
          </Button>
          {last ? (
            <Button
              size="lg"
              onClick={() => nav(`/hero/${hero.id}/quiz`)}
              className="gap-1 bg-gradient-warm"
            >
              {tr.startQuiz} <HelpCircle />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setIdx((i) => Math.min(hero.pages.length - 1, i + 1))}
              className="gap-1 bg-gradient-warm"
            >
              {tr.next} <ChevronRight />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
