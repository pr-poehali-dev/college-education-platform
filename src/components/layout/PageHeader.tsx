import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

export default function PageHeader({ badge, badgeColor = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800", title, subtitle, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="pt-24 pb-10 bg-muted/20 border-b border-border">
      <div className="container max-w-7xl mx-auto px-4">
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Icon name="Home" size={13} />
              Главная
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <Icon name="ChevronRight" size={13} />
                {b.href ? (
                  <Link to={b.href} className="hover:text-primary transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-foreground font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        {badge && (
          <Badge className={`mb-3 ${badgeColor}`}>{badge}</Badge>
        )}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2 text-base">{subtitle}</p>}
          </div>
          {children && <div className="flex items-center gap-2 flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}
