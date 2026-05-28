import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "@/data";

export default function Footer() {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <span className="font-montserrat font-black text-lg text-foreground">
                Колледж<span className="gradient-text">Портал</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Цифровая образовательная платформа нового поколения для студентов, преподавателей и родителей
            </p>
            <div className="flex gap-2">
              {[
                { name: "Github", icon: "Github" },
                { name: "VK", icon: "MessageSquare" },
                { name: "Telegram", icon: "Send" },
                { name: "YouTube", icon: "Youtube" },
              ].map(soc => (
                <button key={soc.name} title={soc.name}
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Icon name={soc.icon} size={15} fallback="Globe" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-foreground text-sm mb-4">Навигация</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-foreground text-sm mb-4">Для кого</h4>
            <ul className="space-y-2">
              {[
                { label: "Студентам", href: "/cabinet" },
                { label: "Преподавателям", href: "/auth/login" },
                { label: "Родителям", href: "/auth/login" },
                { label: "Администраторам", href: "/auth/login" },
                { label: "Абитуриентам", href: "/contacts" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {l.label}
                  </Link>
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
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/support" className="text-muted-foreground text-xs hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/support" className="text-muted-foreground text-xs hover:text-primary transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
