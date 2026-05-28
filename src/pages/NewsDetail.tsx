import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { NEWS } from "@/data";

export default function NewsDetail() {
  const { id } = useParams();
  const news = NEWS.find(n => n.id === Number(id));
  const others = NEWS.filter(n => n.id !== Number(id)).slice(0, 3);

  if (!news) {
    return (
      <Layout>
        <div className="pt-32 text-center">
          <h2 className="font-montserrat text-2xl font-bold text-foreground mb-4">Новость не найдена</h2>
          <Link to="/news" className="text-primary hover:underline">← Вернуться к новостям</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        badge={news.tag}
        title={news.title}
        subtitle={news.date}
        breadcrumbs={[{ label: "Новости", href: "/news" }, { label: news.title }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="h-2 gradient-bg rounded-full mb-8" />
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-foreground text-lg leading-relaxed mb-6">{news.full}</p>
              <p className="text-muted-foreground leading-relaxed">
                Следите за обновлениями на портале и в личном кабинете. По всем вопросам обращайтесь в учебную часть или через систему поддержки.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Поделиться:</span>
              {["Send", "MessageSquare", "Copy"].map(ic => (
                <button key={ic} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Icon name={ic} size={15} fallback="Share" />
                </button>
              ))}
              <Link to="/news" className="ml-auto flex items-center gap-2 text-primary text-sm hover:underline">
                <Icon name="ArrowLeft" size={15} /> Все новости
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-foreground">Другие новости</h3>
            {others.map(n => (
              <Link key={n.id} to={`/news/${n.id}`}
                className="block bg-card border border-border rounded-2xl p-4 card-hover group">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${n.tagColor}`}>{n.tag}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{n.date}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">{n.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
