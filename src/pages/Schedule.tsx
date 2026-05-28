import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { SCHEDULE_WEEK, EVENTS, EVENT_COLORS } from "@/data";

const TYPE_COLORS: Record<string, string> = {
  "Лекция": "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  "Практика": "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  "Лабор.": "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(2);

  const currentDay = SCHEDULE_WEEK[activeDay];

  return (
    <Layout>
      <PageHeader
        badge="Учебное расписание"
        badgeColor="bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800"
        title="Расписание занятий"
        subtitle="Группа ИТ-22 · 2025–2026 учебный год"
        breadcrumbs={[{ label: "Расписание" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
              {SCHEDULE_WEEK.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeDay === i
                      ? "gradient-bg text-white shadow-glow-blue"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                  <div className="font-semibold">{d.day}</div>
                  <div className={`text-xs mt-0.5 ${activeDay === i ? "text-white/70" : "text-muted-foreground"}`}>{d.date}</div>
                </button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Icon name="Calendar" size={18} className="text-primary" />
                <div>
                  <span className="font-montserrat font-bold text-foreground">{currentDay.day}</span>
                  <span className="text-muted-foreground text-sm ml-2">{currentDay.date} мая 2026</span>
                </div>
                <Badge className="ml-auto bg-muted text-muted-foreground border-0">
                  {currentDay.lessons.length} пар
                </Badge>
              </div>

              {currentDay.lessons.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Icon name="Coffee" size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Выходной день</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {currentDay.lessons.map((l, i) => (
                    <div key={i} className="p-4 flex gap-4 hover:bg-muted/30 transition-colors">
                      <div className="w-24 flex-shrink-0">
                        <div className="text-xs font-semibold text-foreground">{l.time.split("–")[0]}</div>
                        <div className="text-xs text-muted-foreground">{l.time.split("–")[1]}</div>
                      </div>
                      <div className="w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm mb-1">{l.subject}</div>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="User" size={11} />{l.teacher}</span>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Ауд. {l.room}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-lg flex-shrink-0 h-fit ${TYPE_COLORS[l.type] || "bg-muted text-muted-foreground"}`}>
                        {l.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-montserrat font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="AlertCircle" size={18} className="text-orange-500" />
                Ближайшие события
              </h3>
              <div className="space-y-3">
                {EVENTS.map(e => (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0 ${EVENT_COLORS[e.type]}`}>
                      <div className="font-montserrat font-black text-xs leading-none">{e.date.split(" ")[0]}</div>
                      <div className="text-xs opacity-70">{e.date.split(" ")[1]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground leading-tight">{e.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Icon name="Clock" size={11} />{e.time} · {e.group}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-montserrat font-bold text-foreground mb-3">Информация</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Группа", value: "ИТ-22" },
                  { label: "Специальность", value: "Программирование" },
                  { label: "Учебный год", value: "2025–2026" },
                  { label: "Семестр", value: "2-й" },
                  { label: "Куратор", value: "Иванов А.В." },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
