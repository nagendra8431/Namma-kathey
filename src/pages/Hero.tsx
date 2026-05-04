import { Link, Navigate, useParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findHero } from "@/data/heroes";
import { useBadges, useLang, t } from "@/lib/store";
import { BookOpen, MapPin, HelpCircle, Award } from "lucide-react";

export default function Hero() {
  const { heroId } = useParams();
  const [lang] = useLang();
  const tr = t[lang];
  const badges = useBadges();
  const found = heroId ? findHero(heroId) : null;
  if (!found) return <Navigate to="/" replace />;
  const { hero, district } = found;
  const earned = badges.includes(hero.id);

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <div className="mb-5 rounded-3xl bg-gradient-sunset p-6 text-center text-primary-foreground shadow-warm">
          <span className="text-7xl">{hero.emoji}</span>
          <h2 className="mt-2 text-2xl font-extrabold">{hero.name[lang]}</h2>
          <p className="text-sm opacity-90">{hero.title[lang]}</p>
          <p className="mt-1 text-xs opacity-80">
            {hero.era} • {district.name[lang]}
          </p>
          {earned && (
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Award className="h-4 w-4" /> {tr.badgeEarned}
            </span>
          )}
        </div>

        <div className="grid gap-3">
          <Link to={`/hero/${hero.id}/story`}>
            <Card className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-warm">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-extrabold">{tr.readStory}</p>
                <p className="text-xs text-muted-foreground">{hero.pages.length} {lang === "en" ? "pages" : "ಪುಟಗಳು"}</p>
              </div>
              <Button size="sm" className="bg-gradient-warm">{tr.readStory}</Button>
            </Card>
          </Link>

          <Link to={`/hero/${hero.id}/quiz`}>
            <Card className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-warm">
              <HelpCircle className="h-8 w-8 text-accent" />
              <div className="flex-1">
                <p className="font-extrabold">{tr.quiz}</p>
                <p className="text-xs text-muted-foreground">{hero.quiz.length} {lang === "en" ? "questions" : "ಪ್ರಶ್ನೆಗಳು"}</p>
              </div>
              <Button size="sm" variant="secondary">{tr.startQuiz}</Button>
            </Card>
          </Link>

          <Link to={`/hero/${hero.id}/memorial`}>
            <Card className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-warm">
              <MapPin className="h-8 w-8 text-success" />
              <div className="flex-1">
                <p className="font-extrabold">{tr.memorial}</p>
                <p className="truncate text-xs text-muted-foreground">{hero.memorial.place[lang]}</p>
              </div>
              <Button size="sm" variant="outline">{tr.viewMemorial}</Button>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
