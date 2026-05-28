import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { ROLES } from "@/data";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "Студент" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dark, toggleDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Заполните все поля"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cabinet");
    }, 1200);
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4 font-golos relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
            <Icon name="GraduationCap" size={18} className="text-white" />
          </div>
          <span className="font-montserrat font-bold text-white text-sm hidden sm:block">КолледжПортал</span>
        </Link>
      </div>

      <div className="absolute top-4 right-4">
        <button onClick={toggleDark}
          className="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
          <Icon name={dark ? "Sun" : "Moon"} size={16} />
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-dark border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-glow-blue">
              <Icon name="LogIn" size={28} className="text-white" />
            </div>
            <h1 className="font-montserrat font-black text-2xl text-white mb-1">Вход в систему</h1>
            <p className="text-white/60 text-sm">КолледжПортал · Учебный год 2025–2026</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {ROLES.map(r => (
              <button key={r.label} onClick={() => setForm(f => ({ ...f, role: r.label }))}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                  form.role === r.label
                    ? "border-blue-400 bg-blue-500/20 text-white"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 hover:bg-white/5"
                }`}>
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={r.icon} size={14} className="text-white" fallback="User" />
                </div>
                <span className="text-xs font-medium">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Email или логин</label>
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="student@college.ru"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3">
                <Icon name="AlertCircle" size={15} className="text-red-400 flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-blue-500" />
                <span className="text-white/60 text-sm">Запомнить меня</span>
              </label>
              <Link to="/auth/forgot" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                Забыли пароль?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} />
                  Войти
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">
              Нет аккаунта?{" "}
              <Link to="/auth/register" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
