import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { ANALYTICS_MONTHS, STATS, GRADES, COURSES } from "@/data";

const COMPLETION = [
  { label: "Программирование", val: 78, color: "bg-blue-500" },
  { label: "Веб-разработка", val: 65, color: "bg-purple-500" },
  { label: "Базы данных", val: 52, color: "bg-indigo-500" },
  { label: "Математика", val: 88, color: "bg-emerald-500" },
  { label: "Сети", val: 43, color: "bg-orange-500" },
];

export default function Analytics() {
  return (
    <Layout>
      <PageHeader
        badge="Аналитика"
        badgeColor="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800"
        title="Dashboard успеваемости"
        subtitle="Статистика обучения в реальном времени"
        breadcrumbs={[{ label: "Аналитика" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-8">

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-montserrat font-bold text-foreground">Успеваемость и посещаемость</h3>
                <p className="text-muted-foreground text-sm">Группа ИТ-22 · 2025–2026</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />Успеваемость</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-purple-400 inline-block" />Посещаемость</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ANALYTICS_MONTHS} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <Bar dataKey="avg" name="Успеваемость" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attendance" name="Посещаемость" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-foreground mb-1">Завершение курсов</h3>
            <p className="text-muted-foreground text-sm mb-6">По дисциплинам</p>
            <div className="space-y-4">
              {COMPLETION.map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-foreground mb-1">Выполнение заданий</h3>
            <p className="text-muted-foreground text-sm mb-5">Количество сданных работ по месяцам</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ANALYTICS_MONTHS}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="tasks" name="Заданий" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: "#7C3AED" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-foreground mb-4">Оценки по предметам</h3>
            <div className="space-y-3">
              {GRADES.map((g, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs text-muted-foreground w-32 flex-shrink-0 truncate">{g.subject}</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${(g.avg / 5) * 100}%` }} />
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-foreground">{g.avg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Students table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <Icon name="Users" size={18} className="text-primary" />
            <h3 className="font-montserrat font-bold text-foreground">Рейтинг курсов</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Курс</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Преподаватель</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Студентов</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Рейтинг</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Прогресс</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COURSES.map(c => (
                  <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex-shrink-0`} />
                        <span className="font-medium text-foreground">{c.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{c.teacher}</td>
                    <td className="px-5 py-3 text-foreground font-medium">{c.students}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Icon name="Star" size={13} className="fill-amber-500" />
                        {c.rating}
                      </span>
                    </td>
                    <td className="px-5 py-3 w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{c.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}
