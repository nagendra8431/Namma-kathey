import { Navigate, useParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findHero } from "@/data/heroes";
import { useLang, t } from "@/lib/store";
import { ExternalLink, MapPin } from "lucide-react";

export default function Memorial() {
  const { heroId } = useParams();
  const [lang] = useLang();
  const tr = t[lang];
  const found = heroId ? findHero(heroId) : null;
  if (!found) return <Navigate to="/" replace />;
  const { hero } = found;
  const m = hero.memorial;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.mapsQuery)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(m.mapsQuery)}&output=embed`;

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-10 pt-6">
        <div className="mb-4 rounded-3xl bg-gradient-warm p-5 text-primary-foreground shadow-warm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase opacity-90">
            <MapPin className="h-4 w-4" /> {tr.memorial}
          </div>
          <h2 className="mt-1 text-2xl font-extrabold">{m.name[lang]}</h2>
          <p className="text-sm opacity-90">{m.place[lang]}</p>
        </div>

        <Card className="overflow-hidden rounded-3xl border-2 border-border shadow-card">
          <div className="aspect-video w-full bg-muted">
            <iframe
              title={m.name[lang]}
              src={embedUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-5">
            <p className="text-sm leading-relaxed">{m.description[lang]}</p>
            <Button asChild size="lg" className="mt-4 w-full gap-2 bg-gradient-warm">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                {tr.openMaps} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
