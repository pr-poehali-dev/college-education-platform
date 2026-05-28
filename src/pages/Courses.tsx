import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { COURSES } from "@/data";

const CATS = ["Все", "IT", "Математика", "Языки", "Экономика"];
const LEVELS = ["Все уровни", "Начальный", "Средний", "Продвинутый"];

export default function Courses() {
  const [filter, setFilter] = useState("Все");
  const [level, setLevel] = useState("Все уровни");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter(c => {
    const matchCat = filter === "Все" || c.category === filter;
    const matchLevel = level === "Все уровни" || c.level === level;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <Layout>
      <PageHeader
        badge="Учебные программы"
        badgeColor="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800"
        title="Каталог курсов"
        subtitle={`${COURSES.length} курсов по всем специальностям`}
        breadcrumbs={[{ label: "Курсы" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или преподавателю..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                filter === c ? "gradient-bg text-white shadow-glow-blue" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Курсы не найдены</p>
            <button onClick={() => { setSearch(""); setFilter("Все"); setLevel("Все уровни"); }}
              className="mt-4 text-primary text-sm hover:underline">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(c => (
              <Link key={c.id} to={`/courses/${c.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden card-hover group block">
                <div className={`relative h-36 bg-gradient-to-br ${c.color} overflow-hidden`}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg border border-white/20">{c.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 text-white text-xs px-2 py-1 rounded-lg">
                    <Icon name="Star" size={11} className="text-yellow-400" />{c.rating}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/40 text-white text-xs px-2 py-1 rounded-lg">{c.level}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{c.desc}</p>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                    <Icon name="User" size={12} />{c.teacher}
                    <span className="opacity-50 mx-1">·</span>
                    <Icon name="BookOpen" size={12} />{c.lessons} уроков
                    <span className="opacity-50 mx-1">·</span>
                    <Icon name="Clock" size={12} />{c.duration}
                  </div>
                  {c.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Прогресс</span>
                        <span className="font-medium text-foreground">{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} className="h-1.5" />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Users" size={12} />{c.students} студентов</span>
                    <span className="gradient-bg text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                      {c.progress > 0 ? "Продолжить" : "Начать"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
