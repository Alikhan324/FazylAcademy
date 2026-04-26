"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";

export default function CertificatePage() {
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
  const isCompleted = completedCount >= totalLessons && totalLessons > 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Certificate
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Course completion certificate
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Барлық сабақтарды аяқтасаң, сертификат ашылады.
          </p>
        </div>

        {isCompleted ? (
          <div className="bg-white dark:bg-gray-900 border-4 border-blue-200 dark:border-blue-900 rounded-3xl p-10 shadow-xl text-center">
            <p className="text-blue-600 dark:text-blue-300 font-semibold mb-4">
              FAZYL ACADEMY
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Certificate of Completion
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This certificate is proudly presented to
            </p>

            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-8">
              Student
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-8">
              for successfully completing the English learning course.
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                Completed lessons: {completedCount}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                Total lessons: {totalLessons}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                Status: Completed
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-5">🔒</div>

            <h2 className="text-3xl font-bold mb-3">
              Certificate is locked
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Сертификат алу үшін барлық сабақтарды аяқта.
            </p>

            <p className="text-blue-600 dark:text-blue-300 font-semibold mb-6">
              Progress: {completedCount}/{totalLessons} lessons
            </p>

            <a
              href="/dashboard"
              className="inline-block bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition"
            >
              Go to dashboard
            </a>
          </div>
        )}
      </section>
    </main>
  );
}