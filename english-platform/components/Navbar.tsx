"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    function loadUser() {
      const savedUser = localStorage.getItem("auth-user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    }

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  function logout() {
    localStorage.removeItem("auth-user");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Fazyl<span className="text-blue-600">Academy</span>
        </a>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-900 dark:text-gray-100">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="/courses" className="hover:text-blue-600 transition">
            Courses
          </a>

          <a href="/search" className="hover:text-blue-600 transition">
            Search
          </a>

          {user && (
            <a href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </a>
          )}

          <a href="/pricing" className="hover:text-blue-600 transition">
            Pricing
          </a>

          {user && (
            <a href="/certificate" className="hover:text-blue-600 transition">
              Certificate
            </a>
          )}

          <a href="/admin" className="hover:text-blue-600 transition">
            Admin
          </a>

          <LanguageSwitcher />

          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <a
                href="/profile"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Profile
              </a>

              <button
                type="button"
                onClick={logout}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}