import { Link, useParams, Navigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { DISTRICTS } from "@/data/heroes";
import { useBadges, useLang, t } from "@/lib/store";
import { Award, ChevronRight } from "lucide-react";

export default function District() {
  const { districtId } = useParams();
  const [lang] = useLang();
  const tr = t[lang];
  const badges = useBadges();
  const district = DISTRICTS.find((d) => d.id === districtId);
  if (!district) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <div className="mb-6 flex items-center gap-3 rounded-3xl bg-gradient-warm p-5 text-primary-foreground shadow-warm">
          <span className="text-5xl">{district.emoji}</span>
          <div>
            <p className="text-xs uppercase opacity-80">{lang === "en" ? "District" : "ಜಿಲ್ಲೆ"}</p>
            <h2 className="text-2xl font-extrabold">{district.name[lang]}</h2>
          </div>
        </div>

        <h3 className="mb-3 px-1 text-lg font-extrabold">{tr.heroes}</h3>
        <div className="space-y-3">
          {district.heroes.length === 0 && (
            <Card className="rounded-2xl border-2 border-dashed border-border bg-card/60 p-6 text-center text-muted-foreground">
              {lang === "en"
                ? "Hero stories for this district are coming soon. 🪔"
                : "ಈ ಜಿಲ್ಲೆಯ ವೀರರ ಕಥೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ. 🪔"}
            </Card>
          )}
          {district.heroes.map((h) => {
            const earned = badges.includes(h.id);
            return (
              <Link key={h.id} to={`/hero/${h.id}`}>
                <Card className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-warm">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-sunset text-3xl">
                    {h.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-extrabold">{h.name[lang]}</p>
                    <p className="truncate text-xs text-muted-foreground">{h.title[lang]}</p>
                    <p className="text-[11px] text-muted-foreground">{h.era}</p>
                  </div>
                  {earned && <Award className="h-5 w-5 text-accent" aria-label={tr.badgeEarned} />}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
