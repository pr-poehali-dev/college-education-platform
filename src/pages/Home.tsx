import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { FEATURES, COURSES, NEWS, EVENTS, EVENT_COLORS, STATS, ROLES } from "@/data";

function HeroSection() {
  return (
    <section className="relative min-h-screen hero-bg flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark border border-white/10 text-white/80 text-xs font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Учебный год 2025–2026 · 2 847 студентов онлайн
            </div>

            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up-delay-1">
              Цифровая<br />
              <span className="gradient-text">образовательная</span><br />
              платформа
              <span className="text-white/60 text-2xl sm:text-3xl font-light block mt-1">колледжа</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up-delay-2">
              Современное обучение, аналитика успеваемости и полное взаимодействие студентов, преподавателей и родителей — всё в одном пространстве
            </p>

            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up-delay-3">
              <Link to="/cabinet"
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold shadow-glow-blue hover:opacity-90 transition-all hover:scale-105">
                <Icon name="Rocket" size={18} />
                Начать обучение
              </Link>
              <Link to="/auth/login"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-dark text-white font-semibold border border-white/20 hover:bg-white/10 transition-all">
                <Icon name="LogIn" size={18} />
                Войти
              </Link>
              <Link to="/courses"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-dark text-white/80 font-medium border border-white/10 hover:bg-white/10 transition-all">
                <Icon name="BookOpen" size={18} />
                Просмотреть курсы
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 animate-fade-in-up-delay-4">
              {[
                { val: "200+", label: "Курсов" },
                { val: "95%", label: "Трудоустройство" },
                { val: "4.9★", label: "Рейтинг платформы" },
              ].map(s => (
                <div key={s.label} className="glass-dark border border-white/10 rounded-xl p-3 text-center">
                  <div className="font-montserrat font-black text-xl text-white">{s.val}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-up-delay-2">
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/2088ec45-ef8e-4201-bbc2-7db314728dbd/files/eaa9a93a-d9ab-435b-9a0a-81b7814be9d2.jpg"
                alt="Образовательная платформа"
                className="w-full rounded-3xl shadow-2xl animate-float border border-white/10"
              />
              <div className="absolute -bottom-4 -left-4 glass-dark border border-white/10 rounded-2xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">Успеваемость</div>
                    <div className="text-emerald-400 text-xs">+15% за месяц</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass-dark border border-white/10 rounded-2xl p-3 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">Задания сданы</div>
                    <div className="text-blue-400 text-xs">98 340 работ</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {ROLES.map(r => (
                <Link key={r.label} to="/auth/login"
                  className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={r.icon} size={18} className="text-white" fallback="User" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">{r.label}</div>
                    <div className="text-white/50 text-xs">{r.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full text-background fill-current">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
            Возможности платформы
          </Badge>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground mb-4">
            Всё для современного образования
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Интегрированная экосистема для студентов, преподавателей, родителей и администрации
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className={`${f.bg} rounded-2xl p-6 border border-border card-hover group`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={f.icon} size={22} className="text-white" fallback="Star" />
              </div>
              <h3 className="font-montserrat font-bold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Badge className="mb-3 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800">
              Учебные программы
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground">Популярные курсы</h2>
          </div>
          <Link to="/courses" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline flex-shrink-0">
            Все курсы <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.slice(0, 4).map(c => (
            <Link key={c.id} to={`/courses/${c.id}`} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group block">
              <div className={`relative h-36 bg-gradient-to-br ${c.color} overflow-hidden`}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg border border-white/20">{c.category}</span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 text-white text-xs px-2 py-1 rounded-lg">
                  <Icon name="Star" size={11} className="text-yellow-400" />
                  {c.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                  <Icon name="User" size={12} />{c.teacher}
                  <span className="opacity-50 mx-1">·</span>
                  <Icon name="BookOpen" size={12} />{c.lessons} уроков
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Прогресс</span>
                    <span className="font-medium text-foreground">{c.progress}%</span>
                  </div>
                  <Progress value={c.progress} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Users" size={12} />{c.students}</span>
                  <span className="gradient-bg text-white text-xs font-medium px-3 py-1.5 rounded-lg">Продолжить</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 card-hover text-center">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
                <Icon name={s.icon} size={20} className="text-white" fallback="Circle" />
              </div>
              <div className="font-montserrat font-black text-2xl text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
              <div className="text-xs font-semibold text-emerald-500 mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Badge className="mb-3 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
              Последние новости
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground">Жизнь колледжа</h2>
          </div>
          <Link to="/news" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline flex-shrink-0">
            Все новости <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS.slice(0, 4).map(n => (
            <Link key={n.id} to={`/news/${n.id}`} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group flex flex-col">
              <div className="h-2 gradient-bg" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${n.tagColor}`}>{n.tag}</span>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors flex-1">{n.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">{n.desc}</p>
                <span className="flex items-center gap-1.5 text-primary text-xs font-medium mt-auto">
                  Подробнее <Icon name="ArrowRight" size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Badge className="mb-4 bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800">
              Ближайшие события
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground mb-2">Экзамены и события</h2>
            <p className="text-muted-foreground mb-8">Следи за дедлайнами и важными мероприятиями</p>
            <div className="space-y-3">
              {EVENTS.slice(0, 5).map(e => (
                <div key={e.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 card-hover">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0 ${EVENT_COLORS[e.type]}`}>
                    <div className="font-montserrat font-black text-xs leading-none">{e.date.split(" ")[0]}</div>
                    <div className="text-xs opacity-70">{e.date.split(" ")[1]}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{e.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Icon name="Clock" size={11} />{e.time} · {e.group}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/schedule" className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Полное расписание <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
            <div className="relative z-10">
              <Icon name="GraduationCap" size={40} className="mb-5 opacity-80" />
              <h3 className="font-montserrat font-black text-2xl mb-3">Начни учиться сегодня</h3>
              <p className="text-white/75 mb-6 leading-relaxed">
                Зарегистрируйся и получи доступ ко всем курсам, расписанию и личному кабинету. Более 200 программ обучения.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/auth/login" className="flex-1 bg-white text-blue-600 font-bold py-3 rounded-xl text-sm text-center hover:bg-white/95 transition-all">
                  Войти в кабинет
                </Link>
                <Link to="/auth/register" className="flex-1 border border-white/30 text-white font-semibold py-3 rounded-xl text-sm text-center hover:bg-white/10 transition-all">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CoursesPreview />
      <StatsSection />
      <NewsPreview />
      <EventsPreview />
    </Layout>
  );
}
