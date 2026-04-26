import { courses } from "@/data/courses";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Courses
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Choose your English course
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Өзіңе керек курсты таңда. Әр курс қазақша және орысша түсіндірумен
            беріледі.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course.lessons} lessons
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3">{course.title}</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {course.description}
              </p>

              <a
                href={`/courses/${course.id}`}
                className="block text-center bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
              >
                Open course
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}