"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const searchText = query.toLowerCase();

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText) ||
      course.level.toLowerCase().includes(searchText)
    );
  });

  const filteredLessons = lessons.filter((lesson) => {
    return (
      lesson.title.toLowerCase().includes(searchText) ||
      lesson.description.toLowerCase().includes(searchText) ||
      lesson.shortTitle.toLowerCase().includes(searchText)
    );
  });

  const hasSearch = query.trim().length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Search
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Find courses and lessons
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Курс немесе сабақ атын жаз. Мысалы: Alphabet, Grammar, Present
            Simple.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!hasSearch ? (
          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Start searching</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Іздеу үшін жоғарыдағы input-қа сөз жаз.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-5">Courses</h2>

              {filteredCourses.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  No courses found.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <a
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{course.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {course.level} • {course.lessons} lessons
                          </p>
                        </div>

                        <span className="text-blue-600 dark:text-blue-300 font-semibold">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-5">Lessons</h2>

              {filteredLessons.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  No lessons found.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredLessons.map((lesson) => (
                    <a
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="block bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {lesson.description}
                          </p>
                        </div>

                        <span className="text-blue-600 dark:text-blue-300 font-semibold">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}