import { Languages, Award, Home as HomeIcon, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLang, t, useBadges } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const [lang, setLang] = useLang();
  const badges = useBadges();
  const loc = useLocation();
  const nav = useNavigate();
  const tr = t[lang];
  const showHome = loc.pathname !== "/";
  const showBack = loc.pathname !== "/";

  return (
    <header className="sticky top-0 z-40 bg-gradient-warm shadow-warm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => (window.history.length > 1 ? nav(-1) : nav("/"))}
              aria-label={lang === "en" ? "Back" : "ಹಿಂದೆ"}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <div className="leading-tight">
              <h1 className="text-lg font-extrabold">{tr.appName}</h1>
              <p className="text-[11px] opacity-90">{tr.tagline}</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {showHome && (
            <Button asChild size="icon" variant="ghost" className="text-primary-foreground hover:bg-white/20">
              <Link to="/" aria-label={tr.home}>
                <HomeIcon />
              </Link>
            </Button>
          )}
          <Button asChild size="icon" variant="ghost" className="relative text-primary-foreground hover:bg-white/20">
            <Link to="/badges" aria-label={tr.badges}>
              <Award />
              {badges.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold">
                  {badges.length}
                </span>
              )}
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="gap-1 text-primary-foreground hover:bg-white/20"
          >
            <Languages className="h-4 w-4" />
            <span className="font-bold">{lang === "en" ? "ಕನ್ನಡ" : "EN"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
