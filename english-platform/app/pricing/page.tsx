export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
            Premium
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Unlock all English lessons
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Premium access арқылы барлық сабақтарды, тесттерді және материалдарды аша аласың.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-3xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Барлық курстарға толық доступ.
          </p>

          <div className="text-4xl font-bold mb-6">
            1990 ₸
            <span className="text-base text-gray-500 dark:text-gray-400 font-normal">
              {" "}
              / month
            </span>
          </div>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
            <li> Барлық premium сабақтар</li>
            <li> Quiz және practice тапсырмалар</li>
            <li> PDF / slides материалдар</li>
            <li> Course progress</li>
            <li> Certificate</li>
          </ul>

          <button
            type="button"
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
          >
            Buy Premium
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Қазір бұл тек demo. Кейін Kaspi/Stripe төлем қосамыз.
          </p>
        </div>
      </section>
    </main>
  );
}