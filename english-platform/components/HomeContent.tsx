"use client";

import { useEffect, useState } from "react";
import { translations } from "@/data/translations";

type Language = "kz" | "ru" | "en";

export default function HomeContent() {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;

    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
              {t.heroBadge}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t.heroTitle}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t.heroText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/courses"
                className="bg-blue-600 text-white px-7 py-4 rounded-2xl font-semibold text-center hover:bg-blue-700 transition"
              >
                {t.startLearning}
              </a>

              <a
                href="/register"
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-7 py-4 rounded-2xl font-semibold text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {t.createAccount}
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl transition-colors">
            <h2 className="text-2xl font-bold mb-6">{t.whatYouLearn}</h2>

            <div className="space-y-4">
              <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/30 p-5 transition-colors">
                <h3 className="font-bold text-lg mb-1">{t.grammar}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.grammarText}</p>
              </div>

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/30 p-5 transition-colors">
                <h3 className="font-bold text-lg mb-1">{t.speaking}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.speakingText}</p>
              </div>

              <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/30 p-5 transition-colors">
                <h3 className="font-bold text-lg mb-1">{t.materials}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.materialsText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}