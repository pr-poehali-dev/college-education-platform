import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/context/ThemeContext";
import { ROLES } from "@/data";

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "Студент", group: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dark, toggleDark } = useTheme();
  const navigate = useNavigate();

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role) { setError("Выберите роль"); return; }
    setError("");
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Заполните обязательные поля"); return; }
    setError("");
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password || form.password.length < 6) { setError("Пароль минимум 6 символов"); return; }
    if (form.password !== form.confirm) { setError("Пароли не совпадают"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cabinet");
    }, 1500);
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4 font-golos relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
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
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
              <Icon name="UserPlus" size={28} className="text-white" />
            </div>
            <h1 className="font-montserrat font-black text-2xl text-white mb-1">Регистрация</h1>
            <p className="text-white/60 text-sm">Шаг {step} из 3</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${s <= step ? "gradient-bg" : "bg-white/10"}`} />
            ))}
          </div>

          {/* Step 1: Role */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <p className="text-white/70 text-sm font-medium mb-4">Выберите вашу роль</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ROLES.map(r => (
                  <button key={r.label} type="button" onClick={() => setForm(f => ({ ...f, role: r.label }))}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      form.role === r.label
                        ? "border-blue-400 bg-blue-500/20 text-white"
                        : "border-white/10 text-white/50 hover:border-white/30 hover:bg-white/5"
                    }`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                      <Icon name={r.icon} size={20} className="text-white" fallback="User" />
                    </div>
                    <span className="text-sm font-semibold">{r.label}</span>
                    <span className={`text-xs text-center leading-tight ${form.role === r.label ? "text-white/70" : "text-white/30"}`}>{r.desc}</span>
                  </button>
                ))}
              </div>
              {error && <p className="text-red-400 text-sm mb-3 flex items-center gap-1"><Icon name="AlertCircle" size={14} />{error}</p>}
              <button type="submit" className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Далее <Icon name="ArrowRight" size={16} />
              </button>
            </form>
          )}

          {/* Step 2: Personal info */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Полное имя *</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="text" placeholder="Иванов Иван Иванович" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Email *</label>
                <div className="relative">
                  <Icon name="Mail" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="email" placeholder="ivan@college.ru" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
              {form.role === "Студент" && (
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-1.5">Группа</label>
                  <div className="relative">
                    <Icon name="Users" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="text" placeholder="ИТ-22" value={form.group}
                      onChange={e => setForm(f => ({ ...f, group: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                  </div>
                </div>
              )}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Телефон</label>
                <div className="relative">
                  <Icon name="Phone" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="tel" placeholder="+7 (999) 000-00-00" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
              {error && <p className="text-red-400 text-sm flex items-center gap-1"><Icon name="AlertCircle" size={14} />{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 border border-white/20 text-white py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
                  Назад
                </button>
                <button type="submit" className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Далее <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <form onSubmit={handleStep3} className="space-y-4">
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Пароль *</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="password" placeholder="Минимум 6 символов" value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Повторите пароль *</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="password" placeholder="••••••••" value={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 rounded accent-blue-500 mt-0.5" />
                <span className="text-white/50 text-xs leading-relaxed">
                  Я соглашаюсь с{" "}
                  <Link to="/support" className="text-blue-400 hover:underline">условиями использования</Link>{" "}
                  и{" "}
                  <Link to="/support" className="text-blue-400 hover:underline">политикой конфиденциальности</Link>
                </span>
              </label>
              {error && <p className="text-red-400 text-sm flex items-center gap-1"><Icon name="AlertCircle" size={14} />{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 border border-white/20 text-white py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
                  Назад
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Icon name="CheckCircle2" size={16} />Создать аккаунт</>}
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 pt-5 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">
              Уже есть аккаунт?{" "}
              <Link to="/auth/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">Войти</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
