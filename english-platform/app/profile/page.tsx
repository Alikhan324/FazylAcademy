"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(savedUser));

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

  function logout() {
    localStorage.removeItem("auth-user");
    window.location.href = "/login";
  }

  function upgradeToPremium() {
    if (!user) return;

    const updatedUser = {
      ...user,
      isPremium: true,
    };

    localStorage.setItem("auth-user", JSON.stringify(updatedUser));

    const registeredUser = localStorage.getItem("registered-user");

    if (registeredUser) {
      const parsed = JSON.parse(registeredUser);
      localStorage.setItem(
        "registered-user",
        JSON.stringify({
          ...parsed,
          isPremium: true,
        })
      );
    }

    setUser(updatedUser);
    alert("Premium activated!");
  }

  if (!user) {
    return null;
  }

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Profile
          </p>

          <h1 className="text-4xl font-bold mb-3">My profile</h1>

          <p className="text-gray-600 dark:text-gray-300">
            Бұл жерде сен аккаунт ақпаратын және оқу прогрессін көресің.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-4xl mb-5">
              👤
            </div>

            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-5">
              {user.email}
            </p>

            <span
              className={
                user.isPremium
                  ? "inline-block bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full font-semibold"
                  : "inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold"
              }
            >
              {user.isPremium ? "Premium user" : "Free user"}
            </span>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5">Learning stats</h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Completed
                </p>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {completedCount}
                </h3>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Total
                </p>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {totalLessons}
                </h3>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Progress
                </p>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {progress}%
                </h3>
              </div>
            </div>

            <div className="w-full bg-blue-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              Сен {completedCount}/{totalLessons} сабақты аяқтадың.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-5">Account actions</h2>

          <div className="grid sm:grid-cols-4 gap-4">
            <a
              href="/dashboard"
              className="block text-center bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
            >
              Dashboard
            </a>

            <button
              type="button"
              onClick={upgradeToPremium}
              className="block text-center bg-yellow-500 text-white rounded-xl py-3 font-semibold hover:bg-yellow-600 transition"
            >
              Upgrade
            </button>

            <a
              href="/certificate"
              className="block text-center bg-green-600 text-white rounded-xl py-3 font-semibold hover:bg-green-700 transition"
            >
              Certificate
            </a>

            <button
              type="button"
              onClick={logout}
              className="block text-center bg-red-500 text-white rounded-xl py-3 font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}