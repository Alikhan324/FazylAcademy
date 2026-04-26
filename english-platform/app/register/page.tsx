export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-2">Register</h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Жаңа аккаунт ашып, ағылшын үйренуді баста.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full name
              </label>

              <input
                type="text"
                placeholder="Alihan Fazylgaliov"
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="student@gmail.com"
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
            Аккаунтың бар ма?{" "}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-300 font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}