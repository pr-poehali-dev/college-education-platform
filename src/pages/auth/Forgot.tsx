import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/context/ThemeContext";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dark, toggleDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4 font-golos relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" />
      </div>

      <div className="absolute top-4 left-4">
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
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="KeyRound" size={28} className="text-blue-400" />
                </div>
                <h1 className="font-montserrat font-black text-2xl text-white mb-2">Восстановление пароля</h1>
                <p className="text-white/60 text-sm">Введите email, привязанный к аккаунту. Мы отправим инструкцию.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-1.5">Email</label>
                  <div className="relative">
                    <Icon name="Mail" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="email" placeholder="your@email.ru" value={email}
                      onChange={e => setEmail(e.target.value)} required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Icon name="Send" size={16} />Отправить инструкцию</>
                  }
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="MailCheck" size={28} className="text-emerald-400" />
              </div>
              <h2 className="font-montserrat font-black text-xl text-white mb-2">Письмо отправлено!</h2>
              <p className="text-white/60 text-sm mb-2">Проверьте почту <strong className="text-white">{email}</strong></p>
              <p className="text-white/40 text-xs mb-6">Не забудьте проверить папку «Спам»</p>
              <button onClick={() => setSent(false)} className="text-blue-400 text-sm hover:underline block mx-auto mb-4">
                Отправить повторно
              </button>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <Link to="/auth/login" className="text-white/50 text-sm hover:text-white/80 transition-colors flex items-center justify-center gap-1.5">
              <Icon name="ArrowLeft" size={14} /> Вернуться ко входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
