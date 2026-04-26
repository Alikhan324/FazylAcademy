"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme") as Theme | null;

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function setLightTheme() {
    setTheme("light");
    localStorage.setItem("site-theme", "light");
    document.documentElement.classList.remove("dark");
  }

  function setDarkTheme() {
    setTheme("dark");
    localStorage.setItem("site-theme", "dark");
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="flex items-center gap-1 bg-blue-50 dark:bg-gray-800 rounded-xl p-1">
      <button
        type="button"
        onClick={setLightTheme}
        className={
          theme === "light"
            ? "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
            : "text-blue-600 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-semibold"
        }
      >
        ☀️ Light
      </button>

      <button
        type="button"
        onClick={setDarkTheme}
        className={
          theme === "dark"
            ? "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
            : "text-blue-600 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-semibold"
        }
      >
        🌙 Dark
      </button>
    </div>
  );
}