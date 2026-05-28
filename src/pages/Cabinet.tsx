import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { COURSES, GRADES, ASSIGNMENTS, SCHEDULE_WEEK } from "@/data";

const TABS = [
  { id: "overview", label: "Обзор", icon: "LayoutDashboard" },
  { id: "schedule", label: "Расписание", icon: "Calendar" },
  { id: "grades", label: "Оценки", icon: "BarChart2" },
  { id: "assignments", label: "Задания", icon: "ClipboardList" },
  { id: "courses", label: "Мои курсы", icon: "BookOpen" },
];

const NOTIFICATIONS = [
  { text: "Новое задание: «Практическая по JOIN»", time: "2 ч назад", icon: "FileText", unread: true },
  { text: "Оценка 5 за лабораторную №8", time: "5 ч назад", icon: "CheckCircle2", unread: true },
  { text: "Дедлайн курсовой через 3 дня!", time: "Вчера", icon: "AlertCircle", unread: true },
  { text: "Иванов А.В. добавил новый урок", time: "2 дня назад", icon: "BookOpen", unread: false },
];

const STATUS_COLORS: Record<string, string> = {
  "Сдано": "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  "В работе": "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  "Не начато": "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  "Проверяется": "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
};

export default function Cabinet() {
  const [tab, setTab] = useState("overview");
  const today = SCHEDULE_WEEK[2];

  return (
    <Layout>
      <PageHeader
        badge="Личный кабинет"
        badgeColor="bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800"
        title="Кабинет студента"
        subtitle="Добро пожаловать, Алексей!"
        breadcrumbs={[{ label: "Личный кабинет" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
                <Icon name="User" size={36} className="text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-foreground">Алексей Иванов</h3>
              <p className="text-muted-foreground text-sm">Группа ИТ-22</p>
              <p className="text-muted-foreground text-xs mt-0.5">Программирование</p>
              <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 text-center gap-2">
                <div><div className="font-bold text-foreground text-sm">4.7</div><div className="text-xs text-muted-foreground">Ср. балл</div></div>
                <div><div className="font-bold text-foreground text-sm">94%</div><div className="text-xs text-muted-foreground">Посещ.</div></div>
                <div><div className="font-bold text-foreground text-sm">2</div><div className="text-xs text-muted-foreground">Курс</div></div>
              </div>
              <button className="mt-3 w-full border border-border text-foreground text-xs py-2 rounded-xl hover:bg-muted transition-all">
                Редактировать профиль
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Bell" size={16} className="text-primary" />
                <span className="font-semibold text-foreground text-sm">Уведомления</span>
                <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {NOTIFICATIONS.filter(n => n.unread).length}
                </span>
              </div>
              <div className="space-y-1.5">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${n.unread ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted"}`}>
                    <Icon name={n.icon} size={13} className={`mt-0.5 flex-shrink-0 ${n.unread ? "text-primary" : "text-muted-foreground"}`} fallback="Bell" />
                    <div>
                      <div className={`text-xs ${n.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.text}</div>
                      <div className="text-xs text-muted-foreground/70 mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                <Icon name="Zap" size={15} className="text-amber-500" />
                Быстрые действия
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: "Расписание на сегодня", href: "/schedule", icon: "Calendar" },
                  { label: "Сдать задание", href: "/cabinet", icon: "Upload" },
                  { label: "Написать преподавателю", href: "/cabinet", icon: "MessageCircle" },
                  { label: "Аналитика успеваемости", href: "/analytics", icon: "BarChart3" },
                ].map((a, i) => (
                  <Link key={i} to={a.href}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground">
                    <Icon name={a.icon} size={13} className="text-primary flex-shrink-0" fallback="ArrowRight" />
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
              {TABS.map(t => (
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
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Активных курсов", val: "6", icon: "BookOpen", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                      { label: "Заданий на неделю", val: String(ASSIGNMENTS.filter(a => a.status !== "Сдано").length), icon: "ClipboardList", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                      { label: "Пар сегодня", val: String(today.lessons.length), icon: "Clock", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                    ].map(s => (
                      <div key={s.label} className="bg-muted/30 rounded-xl p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                          <Icon name={s.icon} size={18} fallback="Circle" />
                        </div>
                        <div>
                          <div className="font-montserrat font-black text-xl text-foreground">{s.val}</div>
                          <div className="text-xs text-muted-foreground">{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                      <Icon name="TrendingUp" size={15} className="text-primary" />
                      Прогресс по курсам
                    </h4>
                    <div className="space-y-3">
                      {COURSES.slice(0, 5).map(c => (
                        <Link key={c.id} to={`/courses/${c.id}`} className="flex items-center gap-3 group">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-foreground font-medium truncate group-hover:text-primary transition-colors">{c.title}</span>
                              <span className="text-muted-foreground ml-2">{c.progress}%</span>
                            </div>
                            <Progress value={c.progress} className="h-1.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                      <Icon name="Clock" size={15} className="text-primary" />
                      Расписание на сегодня — {today.day}
                    </h4>
                    <div className="space-y-2">
                      {today.lessons.map((l, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                          <div className="text-xs text-muted-foreground w-20 flex-shrink-0">{l.time.split("–")[0]}</div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground text-sm">{l.subject}</div>
                            <div className="text-xs text-muted-foreground">{l.teacher} · Ауд. {l.room}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "schedule" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      Среда, 28 мая 2026
                    </h4>
                    <Link to="/schedule" className="text-primary text-xs hover:underline flex items-center gap-1">
                      Полное расписание <Icon name="ArrowRight" size={13} />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {today.lessons.map((l, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="text-xs text-muted-foreground w-24 flex-shrink-0 pt-0.5">{l.time}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">{l.subject}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{l.teacher} · Ауд. {l.room}</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 h-fit flex-shrink-0">{l.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "grades" && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-sm">Успеваемость по предметам</h4>
                  <div className="space-y-3">
                    {GRADES.map((g, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-foreground text-sm">{g.subject}</div>
                            <div className="text-xs text-muted-foreground">{g.teacher}</div>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-montserrat font-black text-lg text-white ${
                            g.avg >= 4.5 ? "bg-emerald-500" : g.avg >= 4 ? "bg-blue-500" : "bg-orange-500"
                          }`}>{g.avg.toFixed(1)}</div>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {g.grades.map((gr, j) => (
                            <span key={j} className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                              gr >= 5 ? "bg-emerald-500" : gr >= 4 ? "bg-blue-500" : gr >= 3 ? "bg-orange-500" : "bg-red-500"
                            }`}>{gr}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "assignments" && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-sm">Текущие задания</h4>
                  <div className="space-y-3">
                    {ASSIGNMENTS.map(a => (
                      <div key={a.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h5 className="font-medium text-foreground text-sm">{a.title}</h5>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                              <Icon name="BookOpen" size={11} />{a.subject}
                              <Icon name="Clock" size={11} />До {a.deadline}
                              <span className="bg-muted px-1.5 py-0.5 rounded">{a.type}</span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-lg flex-shrink-0 font-medium ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{a.points} баллов</span>
                          <div className="flex gap-2">
                            {a.status !== "Сдано" && (
                              <button className="gradient-bg text-white text-xs px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
                                Открыть задание
                              </button>
                            )}
                            {a.status === "Сдано" && (
                              <span className="text-xs text-emerald-500 flex items-center gap-1">
                                <Icon name="CheckCircle2" size={13} /> Сдано
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "courses" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground text-sm">Активные курсы</h4>
                    <Link to="/courses" className="text-primary text-xs hover:underline flex items-center gap-1">
                      Все курсы <Icon name="ArrowRight" size={13} />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {COURSES.map(c => (
                      <Link key={c.id} to={`/courses/${c.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate">{c.title}</div>
                          <div className="text-xs text-muted-foreground">{c.teacher} · {c.lessons} уроков</div>
                          <div className="mt-1.5">
                            <Progress value={c.progress} className="h-1" />
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold text-foreground">{c.progress}%</div>
                          <div className="text-xs text-muted-foreground">прогресс</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
