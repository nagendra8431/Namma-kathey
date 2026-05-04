import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { ALL_HEROES } from "@/data/heroes";
import { useBadges, useLang, t } from "@/lib/store";
import { Award } from "lucide-react";

export default function Badges() {
  const [lang] = useLang();
  const tr = t[lang];
  const badges = useBadges();

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-10 pt-6">
        <div className="mb-5 rounded-3xl bg-gradient-sunset p-6 text-center text-primary-foreground shadow-warm">
          <Award className="mx-auto h-12 w-12" />
          <h2 className="mt-2 text-2xl font-extrabold">{tr.badges}</h2>
          <p className="text-sm opacity-90">
            {badges.length} / {ALL_HEROES.length}
          </p>
        </div>

        {badges.length === 0 ? (
          <Card className="rounded-2xl p-6 text-center text-muted-foreground">{tr.noBadges}</Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ALL_HEROES.filter((h) => badges.includes(h.id)).map((h) => (
              <Link key={h.id} to={`/hero/${h.id}`}>
                <Card className="flex flex-col items-center gap-2 rounded-2xl border-2 border-primary bg-card p-4 text-center shadow-warm">
                  <span className="text-5xl">{h.emoji}</span>
                  <p className="text-sm font-extrabold leading-tight">{h.name[lang]}</p>
                  <Award className="h-4 w-4 text-accent" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
