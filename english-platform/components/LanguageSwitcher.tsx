"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  function changeLanguage(newLanguage: string) {
    setLanguage(newLanguage);
    localStorage.setItem("site-language", newLanguage);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-1 bg-blue-50 rounded-xl p-1">
      <button
        type="button"
        onClick={() => changeLanguage("kz")}
        className={
          language === "kz"
            ? "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
            : "text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold"
        }
      >
        KZ
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("ru")}
        className={
          language === "ru"
            ? "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
            : "text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold"
        }
      >
        RU
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={
          language === "en"
            ? "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
            : "text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold"
        }
      >
        EN
      </button>
    </div>
  );
}