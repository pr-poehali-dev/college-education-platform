import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { COURSES } from "@/data";

const LESSONS = [
  { num: 1, title: "Введение и установка окружения", duration: "25 мин", done: true },
  { num: 2, title: "Переменные и типы данных", duration: "40 мин", done: true },
  { num: 3, title: "Условные операторы и циклы", duration: "55 мин", done: true },
  { num: 4, title: "Функции и модули", duration: "60 мин", done: false },
  { num: 5, title: "Списки, кортежи и словари", duration: "50 мин", done: false },
  { num: 6, title: "Объектно-ориентированное программирование", duration: "75 мин", done: false },
  { num: 7, title: "Работа с файлами", duration: "35 мин", done: false },
  { num: 8, title: "Исключения и обработка ошибок", duration: "40 мин", done: false },
];

export default function CourseDetail() {
  const { id } = useParams();
  const course = COURSES.find(c => c.id === Number(id));

  if (!course) {
    return (
      <Layout>
        <div className="pt-32 text-center">
          <h2 className="font-montserrat text-2xl font-bold text-foreground mb-4">Курс не найден</h2>
          <Link to="/courses" className="text-primary hover:underline">← Вернуться к курсам</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        badge={course.category}
        title={course.title}
        subtitle={`Преподаватель: ${course.teacher} · ${course.lessons} уроков · ${course.duration}`}
        breadcrumbs={[{ label: "Курсы", href: "/courses" }, { label: course.title }]}
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`relative h-56 sm:h-72 bg-gradient-to-br ${course.color} rounded-2xl overflow-hidden mb-6`}>
              <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/30 transition-all">
                  <Icon name="Play" size={28} className="text-white ml-1" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-montserrat font-bold text-xl text-foreground mb-3">О курсе</h2>
              <p className="text-muted-foreground leading-relaxed">{course.desc}</p>
            </div>

            <div>
              <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">Программа курса</h2>
              <div className="space-y-2">
                {LESSONS.map(l => (
                  <div key={l.num}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      l.done ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
                        : "border-border bg-card hover:bg-muted"
                    }`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      l.done ? "bg-emerald-500" : "bg-muted border border-border"
                    }`}>
                      {l.done
                        ? <Icon name="Check" size={14} className="text-white" />
                        : <span className="text-xs font-bold text-muted-foreground">{l.num}</span>
                      }
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${l.done ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"}`}>
                        {l.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Icon name="Clock" size={12} />{l.duration}
                    </div>
                    {!l.done && <Icon name="PlayCircle" size={18} className="text-primary flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex-shrink-0`} />
                <div>
                  <div className="font-semibold text-foreground text-sm">{course.title}</div>
                  <div className="text-muted-foreground text-xs">{course.teacher}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-semibold text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {LESSONS.filter(l => l.done).length} из {LESSONS.length} уроков завершено
                </div>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { icon: "BookOpen", label: `${course.lessons} уроков` },
                  { icon: "Clock", label: course.duration },
                  { icon: "BarChart2", label: course.level },
                  { icon: "Users", label: `${course.students} студентов` },
                  { icon: "Star", label: `${course.rating} рейтинг` },
                ].map((info, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name={info.icon} size={15} className="text-primary flex-shrink-0" fallback="Circle" />
                    {info.label}
                  </div>
                ))}
              </div>

              <button className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Icon name="Play" size={16} />
                {course.progress > 0 ? "Продолжить обучение" : "Начать курс"}
              </button>
              <button className="w-full mt-2 border border-border text-foreground py-2.5 rounded-xl text-sm hover:bg-muted transition-all">
                Добавить в избранное
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
