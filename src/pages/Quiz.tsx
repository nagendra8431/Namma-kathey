import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findHero } from "@/data/heroes";
import { awardBadge, useLang, t } from "@/lib/store";
import { Award, Check, MapPin, RotateCcw, X } from "lucide-react";

export default function Quiz() {
  const { heroId } = useParams();
  const [lang] = useLang();
  const tr = t[lang];
  const found = heroId ? findHero(heroId) : null;
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!found) return <Navigate to="/" replace />;
  const { hero } = found;
  const q = hero.quiz[qIdx];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIdx + 1 < hero.quiz.length) {
      setQIdx(qIdx + 1);
      setPicked(null);
    } else {
      const finalScore = score;
      const passed = finalScore >= Math.ceil(hero.quiz.length / 2);
      if (passed) awardBadge(hero.id);
      setDone(true);
    }
  };

  const restart = () => {
    setQIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const passed = score >= Math.ceil(hero.quiz.length / 2);
    return (
      <div className="min-h-screen bg-gradient-earth">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 pt-10 text-center">
          <div className="rounded-3xl bg-gradient-sunset p-8 text-primary-foreground shadow-warm">
            <Award className="mx-auto h-20 w-20" />
            <h2 className="mt-3 text-2xl font-extrabold">
              {passed ? tr.badgeEarned : tr.yourScore}
            </h2>
            <p className="mt-1 text-lg font-bold">
              {tr.yourScore}: {score} / {hero.quiz.length}
            </p>
            <p className="mt-2 text-sm opacity-90">{hero.name[lang]}</p>
          </div>
          <div className="mt-5 grid gap-3">
            <Button asChild size="lg" className="bg-gradient-warm">
              <Link to={`/hero/${hero.id}/memorial`}>
                <MapPin /> {tr.viewMemorial}
              </Link>
            </Button>
            <Button onClick={restart} size="lg" variant="outline">
              <RotateCcw /> {lang === "en" ? "Try again" : "ಮತ್ತೆ"}
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/">{tr.home}</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-10 pt-6">
        <div className="mb-3 text-xs font-semibold text-muted-foreground">
          {tr.quiz} • {qIdx + 1} / {hero.quiz.length}
        </div>
        <Card className="rounded-3xl border-2 border-border bg-card p-6 shadow-card">
          <h2 className="text-xl font-extrabold">{q.question[lang]}</h2>
          <div className="mt-5 grid gap-3">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.answerIndex;
              const reveal = picked !== null;
              const cls = !reveal
                ? "border-border bg-background hover:border-primary"
                : isCorrect
                ? "border-success bg-success/10 text-success"
                : isPicked
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border bg-background opacity-60";
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={reveal}
                  className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-base font-bold transition ${cls}`}
                >
                  <span>{opt[lang]}</span>
                  {reveal && isCorrect && <Check />}
                  {reveal && isPicked && !isCorrect && <X />}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="mt-5">
          <Button
            disabled={picked === null}
            onClick={next}
            size="lg"
            className="w-full bg-gradient-warm"
          >
            {qIdx + 1 === hero.quiz.length ? tr.finish : tr.next}
          </Button>
        </div>
      </main>
    </div>
  );
}
