import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const FAQ = [
  {
    q: "Как войти в личный кабинет?",
    a: "Нажмите кнопку «Войти» в правом верхнем углу, введите email и пароль, которые вы использовали при регистрации. Если вы впервые заходите — нажмите «Регистрация» и укажите свои данные.",
  },
  {
    q: "Как восстановить пароль?",
    a: "На странице входа нажмите «Забыли пароль?», введите свой email и следуйте инструкции из письма. Письмо приходит в течение 5 минут.",
  },
  {
    q: "Где посмотреть расписание занятий?",
    a: "Расписание доступно в разделе «Расписание» в главном меню, а также в личном кабинете на вкладке «Расписание».",
  },
  {
    q: "Как сдать домашнее задание онлайн?",
    a: "Перейдите в личный кабинет → вкладка «Задания» → найдите нужное задание и нажмите «Открыть задание». Загрузите файл или введите ответ в текстовое поле.",
  },
  {
    q: "Как подключиться к вебинару?",
    a: "За 15 минут до начала вебинара вам придёт уведомление со ссылкой. Также ссылку можно найти в разделе «Расписание» в соответствующем событии.",
  },
  {
    q: "Как скачать учебные материалы?",
    a: "В карточке каждого курса есть раздел «Материалы». Нажмите на нужный файл и он автоматически начнёт загружаться.",
  },
  {
    q: "Как связаться с преподавателем?",
    a: "В профиле каждого курса есть кнопка «Написать преподавателю». Также преподавателям можно писать через раздел «Сообщения» в личном кабинете.",
  },
  {
    q: "Как родитель может следить за успеваемостью?",
    a: "Родители регистрируются отдельно с ролью «Родитель». После подтверждения студентом связи родитель видит оценки, посещаемость и задания в своём кабинете.",
  },
];

const CATEGORIES = [
  { icon: "User", label: "Аккаунт и вход", color: "from-blue-500 to-indigo-500" },
  { icon: "BookOpen", label: "Курсы и обучение", color: "from-purple-500 to-pink-500" },
  { icon: "Calendar", label: "Расписание", color: "from-cyan-500 to-teal-500" },
  { icon: "CreditCard", label: "Оплата и документы", color: "from-amber-500 to-orange-500" },
  { icon: "Bell", label: "Уведомления", color: "from-emerald-500 to-green-500" },
  { icon: "Settings", label: "Технические вопросы", color: "from-slate-500 to-slate-700" },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [ticketSent, setTicketSent] = useState(false);
  const [ticket, setTicket] = useState({ name: "", email: "", category: "", message: "" });

  const filtered = FAQ.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.name || !ticket.email || !ticket.message) return;
    setTicketSent(true);
  };

  return (
    <Layout>
      <PageHeader
        badge="Поддержка"
        badgeColor="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
        title="Центр поддержки"
        subtitle="Среднее время ответа — 30 минут"
        breadcrumbs={[{ label: "Поддержка" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по частым вопросам..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 h-12 text-base rounded-2xl"
            />
          </div>
        </div>

        {/* Categories */}
        {!search && (
          <div>
            <h2 className="font-montserrat font-bold text-foreground text-xl mb-5">Категории вопросов</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map(c => (
                <button key={c.label} onClick={() => setSearch(c.label)}
                  className="bg-card border border-border rounded-2xl p-4 text-center card-hover group flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon name={c.icon} size={22} className="text-white" fallback="Circle" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center leading-tight">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-montserrat font-bold text-foreground text-xl">
                {search ? `Результаты поиска: «${search}»` : "Частые вопросы"}
              </h2>
              {search && (
                <button onClick={() => setSearch("")} className="text-primary text-sm hover:underline flex items-center gap-1">
                  <Icon name="X" size={13} /> Сбросить
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-2xl">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
                <p>Ничего не найдено. Попробуйте другой запрос или создайте тикет.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
                      <span className="font-medium text-foreground text-sm pr-4">{f.q}</span>
                      <Icon name={open === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground flex-shrink-0" />
                    </button>
                    {open === i && (
                      <div className="px-5 pb-5 border-t border-border pt-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ticket form */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-foreground">Создать тикет</h3>
                  <p className="text-muted-foreground text-xs">Не нашли ответа? Напишите нам</p>
                </div>
              </div>

              {ticketSent ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckCircle2" size={28} className="text-emerald-500" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">Тикет создан!</p>
                  <p className="text-muted-foreground text-xs">Ответим в течение 30 минут</p>
                  <button onClick={() => { setTicketSent(false); setTicket({ name: "", email: "", category: "", message: "" }); }}
                    className="mt-4 text-primary text-xs hover:underline">
                    Создать ещё один
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicket} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Имя *</label>
                    <Input placeholder="Ваше имя" value={ticket.name} onChange={e => setTicket(t => ({ ...t, name: e.target.value }))} required className="text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Email *</label>
                    <Input type="email" placeholder="email@example.ru" value={ticket.email} onChange={e => setTicket(t => ({ ...t, email: e.target.value }))} required className="text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Категория</label>
                    <select value={ticket.category} onChange={e => setTicket(t => ({ ...t, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Выберите категорию</option>
                      {CATEGORIES.map(c => <option key={c.label}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Описание проблемы *</label>
                    <Textarea rows={4} placeholder="Опишите проблему подробно..." value={ticket.message} onChange={e => setTicket(t => ({ ...t, message: e.target.value }))} required className="text-sm" />
                  </div>
                  <button type="submit"
                    className="w-full gradient-bg text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <Icon name="Send" size={15} />
                    Отправить тикет
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
