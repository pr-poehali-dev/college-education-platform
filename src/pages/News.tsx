import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { NEWS } from "@/data";

const TAGS = ["Все", "Мероприятия", "Учёба", "Курсы", "Колледж", "Достижения", "Партнёрство"];

export default function News() {
  const [tag, setTag] = useState("Все");

  const filtered = NEWS.filter(n => tag === "Все" || n.tag === tag);

  return (
    <Layout>
      <PageHeader
        badge="Новости"
        badgeColor="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
        title="Жизнь колледжа"
        subtitle="Последние события, достижения и анонсы"
        breadcrumbs={[{ label: "Новости" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                tag === t ? "gradient-bg text-white shadow-glow-blue" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="Newspaper" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Новостей по этой теме пока нет</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(n => (
              <Link key={n.id} to={`/news/${n.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden card-hover group flex flex-col">
                <div className="h-2 gradient-bg" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${n.tagColor}`}>{n.tag}</span>
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors flex-1">
                    {n.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{n.desc}</p>
                  <span className="flex items-center gap-1.5 text-primary text-sm font-medium mt-auto group-hover:gap-2.5 transition-all">
                    Читать полностью <Icon name="ArrowRight" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
