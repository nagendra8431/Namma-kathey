import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { DISTRICTS } from "@/data/heroes";
import { useLang, t, useBadges } from "@/lib/store";

export default function Index() {
  const [lang] = useLang();
  const tr = t[lang];
  const badges = useBadges();
  const totalHeroes = DISTRICTS.reduce((n, d) => n + d.heroes.length, 0);

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <section className="mb-6 rounded-3xl bg-gradient-sunset p-6 text-primary-foreground shadow-warm">
          <h2 className="text-2xl font-extrabold">{lang === "en" ? "Discover Karnataka's Heroes" : "ಕರ್ನಾಟಕದ ವೀರರನ್ನು ತಿಳಿಯಿರಿ"}</h2>
          <p className="mt-1 text-sm opacity-90">
            {lang === "en"
              ? "Tap a district, open a story, listen along, and earn Heritage Badges."
              : "ಜಿಲ್ಲೆಯನ್ನು ಒತ್ತಿ, ಕಥೆ ಓದಿ, ಕೇಳಿ ಮತ್ತು ಪರಂಪರೆ ಪದಕ ಪಡೆಯಿರಿ."}
          </p>
          <div className="mt-4 flex gap-2 text-xs">
            <span className="rounded-full bg-white/20 px-3 py-1 font-semibold">{DISTRICTS.length} {lang === "en" ? "Districts" : "ಜಿಲ್ಲೆಗಳು"}</span>
            <span className="rounded-full bg-white/20 px-3 py-1 font-semibold">{totalHeroes} {lang === "en" ? "Heroes" : "ವೀರರು"}</span>
            <span className="rounded-full bg-white/20 px-3 py-1 font-semibold">🏅 {badges.length}</span>
          </div>
        </section>

        <h3 className="mb-3 px-1 text-lg font-extrabold text-foreground">{tr.chooseDistrict}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DISTRICTS.map((d) => (
            <Link key={d.id} to={`/district/${d.id}`}>
              <Card className="group flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-3 text-center shadow-card transition hover:-translate-y-1 hover:border-primary hover:shadow-warm">
                <span className="text-4xl transition group-hover:scale-110">{d.emoji}</span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{d.name[lang]}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.heroes.length} {lang === "en" ? "hero(es)" : "ವೀರರು"}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
