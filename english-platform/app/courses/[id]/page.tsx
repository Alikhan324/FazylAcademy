import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { currentUser } from "@/data/user";
import { notFound } from "next/navigation";
import CourseProgress from "@/components/CourseProgress";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const courseId = Number(id);

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  const courseLessons = lessons.filter(
    (lesson) => lesson.courseId === courseId
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-14">
        <a
          href="/courses"
          className="text-blue-600 dark:text-blue-300 font-medium"
        >
          ← Back to courses
        </a>

        <div className="mt-8 mb-10">
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
            {course.level}
          </span>

          <h1 className="text-4xl font-bold mt-5 mb-3">
            {course.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            {course.description}
          </p>
        </div>

        <CourseProgress
          courseId={course.id}
          totalLessons={courseLessons.length}
        />

        {courseLessons.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">No lessons yet</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Бұл курсқа сабақтар әлі қосылған жоқ.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {courseLessons.map((lesson) => {
              const isLocked = lesson.isPremium && !currentUser.isPremium;

              return (
                <a
                  key={lesson.id}
                  href={isLocked ? "/pricing" : `/lessons/${lesson.id}`}
                  className={
                    isLocked
                      ? "block bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-900 rounded-3xl p-6 shadow-sm opacity-80 hover:shadow-lg transition"
                      : "block bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">
                          {lesson.title}
                        </h2>

                        {lesson.isPremium && (
                          <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Premium
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300">
                        {lesson.description}
                      </p>
                    </div>

                    <span
                      className={
                        isLocked
                          ? "bg-yellow-50 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-xl text-sm font-semibold"
                          : "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-xl text-sm font-semibold"
                      }
                    >
                      {isLocked ? "🔒 Locked" : lesson.duration}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}