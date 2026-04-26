const stats = [
  {
    title: "Courses",
    value: "3",
  },
  {
    title: "Lessons",
    value: "9",
  },
  {
    title: "Students",
    value: "0",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Курстарды, сабақтарды және материалдарды осы жерден басқарасың.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-300">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Create new lesson</h2>

          <form className="grid gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Lesson title
              </label>

              <input
                type="text"
                placeholder="Lesson 4: Present Simple"
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Kazakh explanation
              </label>

              <textarea
                placeholder="Қазақша түсіндіру..."
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 min-h-28 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Russian explanation
              </label>

              <textarea
                placeholder="Русское объяснение..."
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3 min-h-28 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload material
              </label>

              <input
                type="file"
                className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-blue-100 dark:border-gray-700 rounded-xl px-4 py-3"
              />
            </div>

            <button
              type="button"
              className="bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition"
            >
              Save lesson
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}