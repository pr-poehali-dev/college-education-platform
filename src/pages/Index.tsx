import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ─── DATA ─────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Главная", icon: "Home", href: "#home" },
  { label: "Курсы", icon: "BookOpen", href: "#courses" },
  { label: "Расписание", icon: "Calendar", href: "#schedule" },
  { label: "Личный кабинет", icon: "User", href: "#cabinet" },
  { label: "Новости", icon: "Newspaper", href: "#news" },
  { label: "Аналитика", icon: "BarChart3", href: "#analytics" },
  { label: "Контакты", icon: "MapPin", href: "#contacts" },
  { label: "Поддержка", icon: "LifeBuoy", href: "#support" },
];

const FEATURES = [
  {
    icon: "MonitorPlay",
    title: "Интерактивное обучение",
    desc: "Видеоуроки, тесты, симуляции и живые вебинары в одном месте",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: "Globe",
    title: "Онлайн-курсы",
    desc: "Более 200 курсов по специальностям с сертификатами о прохождении",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: "TrendingUp",
    title: "Аналитика успеваемости",
    desc: "Графики прогресса, рейтинги и сравнение с группой в реальном времени",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: "LayoutDashboard",
    title: "Личный кабинет",
    desc: "Расписание, оценки, задания и документы в персональном пространстве",
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    icon: "Bell",
    title: "Система уведомлений",
    desc: "Push и email-оповещения о дедлайнах, новых заданиях и событиях",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: "ClipboardCheck",
    title: "Проверка заданий",
    desc: "Загрузка файлов, онлайн-сдача работ и обратная связь преподавателя",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

const COURSES = [
  {
    title: "Программирование на Python",
    teacher: "Иванов А.В.",
    lessons: 48,
    progress: 67,
    category: "IT",
    rating: 4.9,
    students: 312,
    color: "from-blue-500 to-indigo-600",
    img: "https://cdn.poehali.dev/projects/2088ec45-ef8e-4201-bbc2-7db314728dbd/files/a69a883d-e996-4100-8ed3-1cdf8cbefb4f.jpg",
  },
  {
    title: "Основы веб-разработки",
    teacher: "Смирнова Е.Н.",
    lessons: 36,
    progress: 45,
    category: "IT",
    rating: 4.8,
    students: 256,
    color: "from-purple-500 to-purple-700",
    img: "https://cdn.poehali.dev/projects/2088ec45-ef8e-4201-bbc2-7db314728dbd/files/a69a883d-e996-4100-8ed3-1cdf8cbefb4f.jpg",
  },
  {
    title: "Математический анализ",
    teacher: "Петров В.С.",
    lessons: 60,
    progress: 82,
    category: "Математика",
    rating: 4.7,
    students: 198,
    color: "from-emerald-500 to-teal-600",
    img: "https://cdn.poehali.dev/projects/2088ec45-ef8e-4201-bbc2-7db314728dbd/files/a69a883d-e996-4100-8ed3-1cdf8cbefb4f.jpg",
  },
  {
    title: "Базы данных и SQL",
    teacher: "Козлова О.И.",
    lessons: 42,
    progress: 23,
    category: "IT",
    rating: 4.9,
    students: 187,
    color: "from-orange-500 to-red-500",
    img: "https://cdn.poehali.dev/projects/2088ec45-ef8e-4201-bbc2-7db314728dbd/files/a69a883d-e996-4100-8ed3-1cdf8cbefb4f.jpg",
  },
];

const NEWS = [
  {
    date: "28 мая 2026",
    tag: "Мероприятия",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Хакатон «Digital Future 2026» — регистрация открыта",
    desc: "Ежегодный хакатон по разработке IT-решений для реального бизнеса. Призовой фонд 500 000 ₽",
  },
  {
    date: "25 мая 2026",
    tag: "Учёба",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Летняя сессия начнётся 16 июня 2026 года",
    desc: "Расписание экзаменов и зачётов опубликовано в личных кабинетах студентов",
  },
  {
    date: "22 мая 2026",
    tag: "Курсы",
    tagColor: "bg-green-100 text-green-700",
    title: "Новый курс «Машинное обучение с Python» уже доступен",
    desc: "50 видеоуроков, практические задания, живые сессии с ментором и сертификат",
  },
  {
    date: "20 мая 2026",
    tag: "Колледж",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Открытый день колледжа — 7 июня 2026",
    desc: "Экскурсии, демонстрации проектов студентов и встречи с преподавателями",
  },
];

const EVENTS = [
  { icon: "FileText", date: "16 июн", time: "09:00", title: "Экзамен: Математический анализ", group: "ИТ-22", color: "text-red-500 bg-red-50 dark:bg-red-950/30" },
  { icon: "AlertCircle", date: "1 июн", time: "23:59", title: "Дедлайн: Курсовая по БД", group: "ИТ-23", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
  { icon: "Video", date: "5 июн", time: "18:00", title: "Вебинар: Карьера в IT 2026", group: "Все группы", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  { icon: "Star", date: "7 июн", time: "10:00", title: "Открытый день колледжа", group: "Открытое мероприятие", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
  { icon: "FileText", date: "20 июн", time: "10:00", title: "Экзамен: Основы сетей", group: "ИТ-22", color: "text-red-500 bg-red-50 dark:bg-red-950/30" },
];

const STATS = [
  { value: "2 847", label: "Активных студентов", icon: "Users", delta: "+12%" },
  { value: "98 340", label: "Завершено заданий", icon: "CheckCircle2", delta: "+8%" },
  { value: "47", label: "Новых пользователей", icon: "UserPlus", delta: "+23%" },
  { value: "4.8", label: "Средний рейтинг", icon: "Star", delta: "+0.2" },
];

const ROLES = [
  { icon: "GraduationCap", label: "Студент", desc: "Курсы, расписание, задания", color: "from-blue-500 to-indigo-500" },
  { icon: "BookUser", label: "Преподаватель", desc: "Учебные материалы, оценки", color: "from-purple-500 to-pink-500" },
  { icon: "Users", label: "Родитель", desc: "Успеваемость, посещаемость", color: "from-emerald-500 to-teal-500" },
  { icon: "ShieldCheck", label: "Администратор", desc: "Управление платформой", color: "from-orange-500 to-red-500" },
];

/* ─── NAVBAR ────────────────────────────────────────────── */

function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-md py-2" : "py-4 bg-transparent"}`}>
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow-blue">
            <Icon name="GraduationCap" size={20} className="text-white" />
          </div>
          <span className="font-montserrat font-extrabold text-lg text-white hidden sm:block drop-shadow">
            Колледж<span className="text-blue-300">Портал</span>
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleDark}
            className="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <Icon name={dark ? "Sun" : "Moon"} size={16} />
          </button>
          <a href="#auth" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/20 text-sm font-medium text-white hover:bg-white/10 transition-all">
            <Icon name="LogIn" size={15} />
            Войти
          </a>
          <a href="#courses" className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold shadow-glow-blue hover:opacity-90 transition-all">
            <Icon name="Rocket" size={15} />
            <span className="hidden sm:inline">Начать обучение</span>
            <span className="sm:hidden">Начать</span>
          </a>
          <button onClick={() => setOpen(!open)} className="xl:hidden w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center text-white">
            <Icon name={open ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden glass-dark border border-white/10 mt-2 mx-4 rounded-2xl p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Icon name={l.icon} size={15} fallback="Circle" />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen hero-bg flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-24 pb-12 relative z-10">
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
              <a href="#cabinet" className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold shadow-glow-blue hover:opacity-90 transition-all hover:scale-105">
                <Icon name="Rocket" size={18} />
                Начать обучение
              </a>
              <a href="#auth" className="flex items-center gap-2 px-6 py-3 rounded-xl glass-dark text-white font-semibold border border-white/20 hover:bg-white/10 transition-all">
                <Icon name="LogIn" size={18} />
                Войти
              </a>
              <a href="#courses" className="flex items-center gap-2 px-6 py-3 rounded-xl glass-dark text-white/80 font-medium border border-white/10 hover:bg-white/10 transition-all">
                <Icon name="BookOpen" size={18} />
                Просмотреть курсы
              </a>
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
                <div key={r.label} className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={r.icon} size={18} className="text-white" fallback="User" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">{r.label}</div>
                    <div className="text-white/50 text-xs">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full text-background fill-current">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

/* ─── FEATURES ──────────────────────────────────────────── */

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
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
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`${f.bg} rounded-2xl p-6 border border-border card-hover group`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
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

/* ─── COURSES ───────────────────────────────────────────── */

function CoursesSection() {
  const [filter, setFilter] = useState("Все");
  const cats = ["Все", "IT", "Математика", "Языки", "Экономика"];

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <Badge className="mb-3 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800">
              Учебные программы
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground">Популярные курсы</h2>
          </div>
          <a href="#courses" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Все курсы <Icon name="ArrowRight" size={16} />
          </a>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                filter === c
                  ? "gradient-bg text-white shadow-glow-blue"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group">
              <div className={`relative h-36 bg-gradient-to-br ${c.color} overflow-hidden`}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg border border-white/20">
                    {c.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 text-white text-xs px-2 py-1 rounded-lg">
                  <Icon name="Star" size={11} className="text-yellow-400" />
                  {c.rating}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                  <Icon name="User" size={12} />
                  {c.teacher}
                  <span className="mx-1 opacity-50">·</span>
                  <Icon name="BookOpen" size={12} />
                  {c.lessons} уроков
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Прогресс</span>
                    <span className="font-medium text-foreground">{c.progress}%</span>
                  </div>
                  <Progress value={c.progress} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Users" size={12} />
                    {c.students}
                  </div>
                  <button className="gradient-bg text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STUDENT CABINET ───────────────────────────────────── */

function StudentCabinetSection() {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Обзор", icon: "LayoutDashboard" },
    { id: "schedule", label: "Расписание", icon: "Calendar" },
    { id: "grades", label: "Оценки", icon: "BarChart2" },
    { id: "assignments", label: "Задания", icon: "ClipboardList" },
  ];

  const schedule = [
    { time: "08:30–10:00", subject: "Программирование на Python", room: "404", teacher: "Иванов А.В.", type: "Лекция" },
    { time: "10:10–11:40", subject: "Базы данных", room: "302", teacher: "Козлова О.И.", type: "Практика" },
    { time: "12:30–14:00", subject: "Математический анализ", room: "201", teacher: "Петров В.С.", type: "Лекция" },
    { time: "14:10–15:40", subject: "Основы сетей", room: "Лаб.1", teacher: "Орлов Д.К.", type: "Лабор." },
  ];

  const grades = [
    { subject: "Программирование", grade: 5, teacher: "Иванов А.В.", date: "24.05" },
    { subject: "Базы данных", grade: 4, teacher: "Козлова О.И.", date: "22.05" },
    { subject: "Матанализ", grade: 5, teacher: "Петров В.С.", date: "20.05" },
    { subject: "Веб-разработка", grade: 4, teacher: "Смирнова Е.Н.", date: "18.05" },
    { subject: "Английский язык", grade: 5, teacher: "Фёдорова М.А.", date: "15.05" },
  ];

  const assignments = [
    { title: "Курсовая работа по БД", subject: "Базы данных", deadline: "01.06.2026", status: "В работе", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400" },
    { title: "Лабораторная №8", subject: "Программирование", deadline: "30.05.2026", status: "Сдано", statusColor: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" },
    { title: "Реферат по сетям", subject: "Основы сетей", deadline: "05.06.2026", status: "Не начато", statusColor: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400" },
    { title: "Тест по матанализу", subject: "Математика", deadline: "28.05.2026", status: "Проверяется", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400" },
  ];

  return (
    <section id="cabinet" className="py-20 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800">
            Личный кабинет
          </Badge>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground mb-4">Кабинет студента</h2>
          <p className="text-muted-foreground text-lg">Всё необходимое для учёбы в одном месте</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
                <Icon name="User" size={36} className="text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-foreground">Алексей Иванов</h3>
              <p className="text-muted-foreground text-sm">Группа ИТ-22</p>
              <p className="text-muted-foreground text-xs mt-0.5">Программирование</p>
              <div className="mt-3 pt-3 border-t border-border flex justify-around text-center">
                <div><div className="font-bold text-foreground text-sm">4.7</div><div className="text-xs text-muted-foreground">Средний балл</div></div>
                <div><div className="font-bold text-foreground text-sm">94%</div><div className="text-xs text-muted-foreground">Посещаемость</div></div>
                <div><div className="font-bold text-foreground text-sm">2</div><div className="text-xs text-muted-foreground">Курс</div></div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Bell" size={16} className="text-primary" />
                <span className="font-semibold text-foreground text-sm">Уведомления</span>
                <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
              </div>
              <div className="space-y-2">
                {[
                  { text: "Новое задание по Матанализу", time: "2 ч назад", icon: "FileText" },
                  { text: "Оценка за лабораторную №7", time: "5 ч назад", icon: "CheckCircle2" },
                  { text: "Дедлайн курсовой через 3 дня", time: "Вчера", icon: "AlertCircle" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <Icon name={n.icon} size={13} className="text-primary mt-0.5 flex-shrink-0" fallback="Bell" />
                    <div>
                      <div className="text-foreground">{n.text}</div>
                      <div className="text-muted-foreground">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    tab === t.id ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}>
                  <Icon name={t.icon} size={15} fallback="Circle" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === "overview" && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Курсов активно", val: "6", icon: "BookOpen", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                      { label: "Заданий на неделю", val: "4", icon: "ClipboardList", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                      { label: "Пар сегодня", val: "4", icon: "Clock", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                    ].map(s => (
                      <div key={s.label} className="bg-muted/30 rounded-xl p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                          <Icon name={s.icon} size={18} fallback="Circle" />
                        </div>
                        <div>
                          <div className="font-montserrat font-bold text-xl text-foreground">{s.val}</div>
                          <div className="text-xs text-muted-foreground">{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">Прогресс по курсам</h4>
                    <div className="space-y-3">
                      {COURSES.map(c => (
                        <div key={c.title} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-foreground font-medium truncate">{c.title}</span>
                              <span className="text-muted-foreground ml-2">{c.progress}%</span>
                            </div>
                            <Progress value={c.progress} className="h-1.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "schedule" && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="font-semibold text-foreground">Среда, 28 мая 2026</span>
                    <span className="ml-auto text-xs text-muted-foreground">Группа ИТ-22</span>
                  </div>
                  <div className="space-y-3">
                    {schedule.map((s, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="text-xs text-muted-foreground w-24 flex-shrink-0 pt-0.5">{s.time}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">{s.subject}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{s.teacher}</span>
                            <span className="text-xs text-muted-foreground">· Ауд. {s.room}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 h-fit flex-shrink-0">{s.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "grades" && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-sm">Последние оценки</h4>
                  <div className="space-y-2">
                    {grades.map((g, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-montserrat font-black text-lg text-white flex-shrink-0 ${
                          g.grade >= 5 ? "bg-emerald-500" : g.grade >= 4 ? "bg-blue-500" : "bg-orange-500"
                        }`}>{g.grade}</div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground text-sm">{g.subject}</div>
                          <div className="text-xs text-muted-foreground">{g.teacher}</div>
                        </div>
                        <span className="text-xs text-muted-foreground">{g.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "assignments" && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-sm">Текущие задания</h4>
                  <div className="space-y-3">
                    {assignments.map((a, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h5 className="font-medium text-foreground text-sm">{a.title}</h5>
                          <span className={`text-xs px-2 py-1 rounded-lg flex-shrink-0 ${a.statusColor}`}>{a.status}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />{a.subject}</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />До {a.deadline}</span>
                        </div>
                        <button className="mt-3 gradient-bg text-white text-xs px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
                          Открыть задание
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ANALYTICS ─────────────────────────────────────────── */

function AnalyticsSection() {
  const bars = [72, 85, 68, 91, 78, 95, 82, 76, 89, 94, 87, 79];
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

  return (
    <section id="analytics" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800">
            Аналитика
          </Badge>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground mb-4">Dashboard успеваемости</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Прозрачная статистика обучения в реальном времени</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 card-hover">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Icon name={s.icon} size={18} className="text-white" fallback="Circle" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                  {s.delta}
                </span>
              </div>
              <div className="font-montserrat font-black text-2xl text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-montserrat font-bold text-foreground">Успеваемость по месяцам</h3>
                <p className="text-muted-foreground text-sm">Средний балл группы ИТ-22</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-sm gradient-bg inline-block" />
                <span className="text-muted-foreground">2025–2026</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-40">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full relative rounded-t-lg overflow-hidden cursor-pointer"
                    style={{ height: `${h * 0.95}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:block">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-foreground mb-1">Завершение курсов</h3>
            <p className="text-muted-foreground text-sm mb-6">По специальностям</p>
            <div className="space-y-4">
              {[
                { label: "Программирование", val: 78, color: "bg-blue-500" },
                { label: "Веб-разработка", val: 65, color: "bg-purple-500" },
                { label: "Базы данных", val: 52, color: "bg-indigo-500" },
                { label: "Математика", val: 88, color: "bg-emerald-500" },
                { label: "Сети и безопасность", val: 43, color: "bg-orange-500" },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── NEWS ──────────────────────────────────────────────── */

function NewsSection() {
  return (
    <section id="news" className="py-20 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <Badge className="mb-3 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
              Последние новости
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground">Жизнь колледжа</h2>
          </div>
          <a href="#news" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Все новости <Icon name="ArrowRight" size={16} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS.map((n, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group flex flex-col">
              <div className="h-2 gradient-bg" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${n.tagColor}`}>{n.tag}</span>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors flex-1">{n.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">{n.desc}</p>
                <button className="flex items-center gap-1.5 text-primary text-xs font-medium hover:gap-2.5 transition-all mt-auto">
                  Подробнее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EVENTS ────────────────────────────────────────────── */

function EventsSection() {
  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Badge className="mb-4 bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800">
              Ближайшие события
            </Badge>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black text-foreground mb-2">
              Экзамены и события
            </h2>
            <p className="text-muted-foreground mb-8">Следи за дедлайнами и важными мероприятиями</p>

            <div className="space-y-3">
              {EVENTS.map((e, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 card-hover group">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0 ${e.color}`}>
                    <div className="font-montserrat font-black text-xs leading-none">{e.date.split(" ")[0]}</div>
                    <div className="text-xs opacity-70">{e.date.split(" ")[1]}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{e.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Clock" size={11} />{e.time}
                      </span>
                      <span className="text-xs text-muted-foreground">· {e.group}</span>
                    </div>
                  </div>
                  <Icon name={e.icon} size={16} className="text-muted-foreground" fallback="Calendar" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div id="support" className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                  <Icon name="LifeBuoy" size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-foreground">Техническая поддержка</h3>
                  <p className="text-muted-foreground text-xs">Среднее время ответа — 30 минут</p>
                </div>
              </div>
              <div className="space-y-1 mb-5">
                {[
                  "Как восстановить пароль от личного кабинета?",
                  "Где посмотреть своё расписание?",
                  "Как сдать задание онлайн?",
                  "Как подключиться к вебинару?",
                ].map((q, i) => (
                  <button key={i} className="w-full text-left flex items-center gap-2 p-2.5 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    <Icon name="ChevronRight" size={14} className="text-primary flex-shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
              <button className="w-full gradient-bg text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Icon name="MessageCircle" size={16} />
                Написать в поддержку
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
              <div className="relative z-10">
                <Icon name="GraduationCap" size={28} className="mb-3 opacity-80" />
                <h3 className="font-montserrat font-black text-xl mb-2">Начни учиться сегодня</h3>
                <p className="text-white/70 text-sm mb-5">Зарегистрируйся и получи доступ ко всем курсам, расписанию и личному кабинету</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-blue-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all">Войти</button>
                  <button className="flex-1 border border-white/30 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Регистрация</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer id="contacts" className="bg-foreground/[0.03] border-t border-border pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <span className="font-montserrat font-black text-lg text-foreground">
                Колледж<span className="gradient-text">Портал</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Цифровая образовательная платформа нового поколения для студентов, преподавателей и родителей
            </p>
            <div className="flex gap-2">
              {["Github", "Twitter", "Linkedin", "Youtube"].map(soc => (
                <button key={soc} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Icon name={soc} size={15} fallback="Globe" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-foreground text-sm mb-4">Навигация</h4>
            <ul className="space-y-2">
              {["Главная", "Курсы", "Расписание", "Личный кабинет", "Новости", "Аналитика"].map(l => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-foreground text-sm mb-4">Для кого</h4>
            <ul className="space-y-2">
              {["Студентам", "Преподавателям", "Родителям", "Администраторам", "Абитуриентам"].map(l => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-foreground text-sm mb-4">Контакты</h4>
            <div className="space-y-3">
              {[
                { icon: "MapPin", text: "г. Москва, ул. Образовательная, д. 1" },
                { icon: "Phone", text: "+7 (495) 123-45-67" },
                { icon: "Mail", text: "info@college-portal.ru" },
                { icon: "Clock", text: "Пн–Пт: 8:00–18:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name={c.icon} size={15} className="text-primary mt-0.5 flex-shrink-0" fallback="Circle" />
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© 2026 КолледжПортал. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */

export default function Index() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <StudentCabinetSection />
      <AnalyticsSection />
      <NewsSection />
      <EventsSection />
      <Footer />
    </div>
  );
}
