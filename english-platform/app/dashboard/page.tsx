"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const allCompleted: number[] = [];

    courses.forEach((course) => {
      const saved = localStorage.getItem(
        `completed-lessons-course-${course.id}`
      );

      if (saved) {
        const parsed: number[] = JSON.parse(saved);
        allCompleted.push(...parsed);
      }
    });

    setCompletedLessons(allCompleted);
  }, []);

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const nextLesson = lessons.find(
    (lesson) => !completedLessons.includes(lesson.id)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Dashboard
          </p>

          <h1 className="text-4xl font-bold mb-3">
            My learning progress
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Бұл жерде сен өз прогрессіңді, аяқталған сабақтарыңды және келесі сабақты көресің.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Completed lessons
            </p>

            <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-300">
              {completedCount}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Total lessons
            </p>

            <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-300">
              {totalLessons}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Progress
            </p>

            <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-300">
              {progress}%
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">Overall progress</h2>

            <span className="text-blue-600 dark:text-blue-300 font-semibold">
              {completedCount}/{totalLessons}
            </span>
          </div>

          <div className="w-full bg-blue-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Continue learning</h2>

            {nextLesson ? (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Келесі сабақ: <b>{nextLesson.title}</b>
                </p>

                <a
                  href={`/lessons/${nextLesson.id}`}
                  className="block text-center bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
                >
                  Continue lesson
                </a>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Керемет! Барлық сабақтарды аяқтадың.
                </p>

                <a
                  href="/courses"
                  className="block text-center bg-green-600 text-white rounded-xl py-3 font-semibold hover:bg-green-700 transition"
                >
                  View courses
                </a>
              </>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Courses</h2>

            <div className="space-y-3">
              {courses.map((course) => {
                const courseLessons = lessons.filter(
                  (lesson) => lesson.courseId === course.id
                );

                const completedInCourse = courseLessons.filter((lesson) =>
                  completedLessons.includes(lesson.id)
                ).length;

                return (
                  <a
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="block bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{course.title}</h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {completedInCourse}/{courseLessons.length} lessons
                        </p>
                      </div>

                      <span className="text-blue-600 dark:text-blue-300 font-semibold">
                        →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}