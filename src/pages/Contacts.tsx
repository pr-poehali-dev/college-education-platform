import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const CONTACTS_INFO = [
  { icon: "MapPin", title: "Адрес", lines: ["г. Москва, ул. Образовательная, д. 1", "Метро «Академическая» — 5 мин"] },
  { icon: "Phone", title: "Телефоны", lines: ["+7 (495) 123-45-67 — приёмная", "+7 (495) 123-45-68 — учебная часть"] },
  { icon: "Mail", title: "Email", lines: ["info@college-portal.ru", "study@college-portal.ru"] },
  { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 8:00–18:00", "Сб: 9:00–14:00"] },
];

const DEPARTMENTS = [
  { name: "Учебная часть", phone: "+7 (495) 123-45-68", email: "study@college-portal.ru", room: "101" },
  { name: "Деканат IT-факультета", phone: "+7 (495) 123-45-69", email: "it@college-portal.ru", room: "202" },
  { name: "Бухгалтерия", phone: "+7 (495) 123-45-70", email: "finance@college-portal.ru", room: "103" },
  { name: "Технический отдел", phone: "+7 (495) 123-45-71", email: "tech@college-portal.ru", room: "315" },
  { name: "Библиотека", phone: "+7 (495) 123-45-72", email: "library@college-portal.ru", room: "012" },
  { name: "Медпункт", phone: "+7 (495) 123-45-73", email: "med@college-portal.ru", room: "005" },
];

export default function Contacts() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <Layout>
      <PageHeader
        badge="Контакты"
        badgeColor="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
        title="Свяжитесь с нами"
        subtitle="Мы всегда готовы ответить на ваши вопросы"
        breadcrumbs={[{ label: "Контакты" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACTS_INFO.map(c => (
            <div key={c.title} className="bg-card border border-border rounded-2xl p-5 card-hover">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-3">
                <Icon name={c.icon} size={18} className="text-white" fallback="Circle" />
              </div>
              <h3 className="font-montserrat font-bold text-foreground text-sm mb-2">{c.title}</h3>
              {c.lines.map((l, i) => <p key={i} className="text-muted-foreground text-sm">{l}</p>)}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-montserrat font-bold text-foreground text-xl mb-1">Написать нам</h2>
            <p className="text-muted-foreground text-sm mb-6">Ответим в течение 1 рабочего дня</p>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-montserrat font-bold text-foreground text-lg mb-2">Сообщение отправлено!</h3>
                <p className="text-muted-foreground text-sm mb-4">Мы свяжемся с вами по адресу {form.email}</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-primary text-sm hover:underline">
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Ваше имя *</label>
                    <Input placeholder="Иван Иванов" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Email *</label>
                    <Input type="email" placeholder="ivan@email.ru" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Тема</label>
                  <Input placeholder="Вопрос о поступлении..." value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Сообщение *</label>
                  <Textarea rows={5} placeholder="Опишите ваш вопрос подробно..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                </div>
                <button type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <Icon name="Send" size={16} />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>

          {/* Departments */}
          <div>
            <h2 className="font-montserrat font-bold text-foreground text-xl mb-5">Подразделения</h2>
            <div className="space-y-3">
              {DEPARTMENTS.map((d, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 card-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{d.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon name="Phone" size={11} className="text-primary" />{d.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon name="Mail" size={11} className="text-primary" />{d.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground flex-shrink-0">
                      Ауд. {d.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
                <Icon name="MapPin" size={28} className="text-white" />
              </div>
              <p className="font-montserrat font-bold text-foreground">г. Москва, ул. Образовательная, д. 1</p>
              <p className="text-muted-foreground text-sm mt-1">Метро «Академическая» — 5 минут пешком</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 gradient-bg text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
                <Icon name="Navigation" size={15} />
                Открыть в Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
