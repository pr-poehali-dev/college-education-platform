import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/context/ThemeContext";
import { NAV_LINKS } from "@/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggleDark } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navBase = isHome && !scrolled
    ? "bg-transparent"
    : "glass shadow-md";

  const textColor = isHome && !scrolled ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const logoText = isHome && !scrolled ? "text-white" : "text-foreground";
  const iconBtn = isHome && !scrolled
    ? "border-white/20 text-white/80 hover:text-white hover:bg-white/10"
    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase} ${scrolled || !isHome ? "py-2" : "py-4"}`}>
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow-blue">
            <Icon name="GraduationCap" size={20} className="text-white" />
          </div>
          <span className={`font-montserrat font-extrabold text-lg hidden sm:block drop-shadow transition-colors ${logoText}`}>
            Колледж<span className="text-blue-400">Портал</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-0.5">
          {NAV_LINKS.map(l => {
            const active = location.pathname === l.href;
            return (
              <Link key={l.label} to={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary"
                    : textColor
                }`}>
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleDark}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${iconBtn}`}>
            <Icon name={dark ? "Sun" : "Moon"} size={16} />
          </button>
          <Link to="/auth/login"
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${iconBtn}`}>
            <Icon name="LogIn" size={15} />
            Войти
          </Link>
          <Link to="/courses"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold shadow-glow-blue hover:opacity-90 transition-all">
            <Icon name="Rocket" size={15} />
            <span className="hidden sm:inline">Начать обучение</span>
            <span className="sm:hidden">Начать</span>
          </Link>
          <button onClick={() => setOpen(!open)}
            className={`xl:hidden w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${iconBtn}`}>
            <Icon name={open ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden glass-dark border border-white/10 mt-2 mx-4 rounded-2xl p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map(l => {
              const active = location.pathname === l.href;
              return (
                <Link key={l.label} to={l.href}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-primary/20 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}>
                  <Icon name={l.icon} size={15} fallback="Circle" />
                  {l.label}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 flex gap-2">
            <Link to="/auth/login" className="flex-1 text-center py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all">
              Войти
            </Link>
            <Link to="/auth/register" className="flex-1 text-center py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-all">
              Регистрация
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
