import { lessons } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { currentUser } from "@/data/user";
import { notFound } from "next/navigation";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import Quiz from "@/components/Quiz";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lessonId = Number(id);

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    notFound();
  }

  if (lesson.isPremium && !currentUser.isPremium) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-900">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white border border-yellow-200 rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-5">🔒</div>

            <h1 className="text-3xl font-bold mb-3">
              This lesson is premium
            </h1>

            <p className="text-gray-600 mb-8">
              Бұл сабақты көру үшін premium access керек.
            </p>

            <a
              href="/pricing"
              className="inline-block bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition"
            >
              View premium plan
            </a>

            <div className="mt-6">
              <a
                href={`/courses/${lesson.courseId}`}
                className="text-blue-600 font-medium"
              >
                ← Back to course
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const courseLessons = lessons.filter(
    (item) => item.courseId === lesson.courseId
  );

  const currentIndex = courseLessons.findIndex(
    (item) => item.id === lesson.id
  );

  const previousLesson = courseLessons[currentIndex - 1];
  const nextLesson = courseLessons[currentIndex + 1];

  const quiz = quizzes.find((item) => item.lessonId === lesson.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-900">
      <section className="max-w-4xl mx-auto px-6 py-14">
        <a
          href={`/courses/${lesson.courseId}`}
          className="text-blue-600 font-medium"
        >
          ← Back to lessons
        </a>

        <div className="mt-8 mb-8">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {lesson.badge}
          </span>

          <h1 className="text-4xl font-bold mt-5 mb-3">
            {lesson.shortTitle}
          </h1>

          <p className="text-gray-600">{lesson.description}</p>
        </div>

        <div className="grid gap-6">
          <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Қазақша түсіндіру</h2>
            <p className="text-gray-600 leading-relaxed">
              {lesson.contentKz}
            </p>
          </div>

          <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Русское объяснение</h2>
            <p className="text-gray-600 leading-relaxed">
              {lesson.contentRu}
            </p>
          </div>

          <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Examples</h2>

            <div className="grid sm:grid-cols-3 gap-4">
              {lesson.examples.map((example) => (
                <div
                  key={example.letter}
                  className="bg-blue-50 rounded-2xl p-4 text-center"
                >
                  <p className="text-3xl font-bold text-blue-600">
                    {example.letter}
                  </p>
                  <p className="text-gray-600">{example.word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Practice</h2>

            <p className="text-gray-600 mb-4">
              Мына мысалдарды дауыстап оқы:
            </p>

            <ul className="space-y-2 text-gray-700">
              {lesson.examples.map((example) => (
                <li key={example.letter}>
                  ✅ {example.letter} — {example.word}
                </li>
              ))}
            </ul>
          </div>

          {quiz && <Quiz questions={quiz.questions} />}
        </div>

        <div className="mt-8 bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Lesson status</h2>
          <p className="text-gray-600 mb-5">
            Сабақты аяқтасаң, төмендегі кнопканы бас.
          </p>

          <LessonCompleteButton
            courseId={lesson.courseId}
            lessonId={lesson.id}
          />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          {previousLesson ? (
            <a
              href={`/lessons/${previousLesson.id}`}
              className="bg-white border border-blue-100 text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              ← Previous lesson
            </a>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <a
              href={`/lessons/${nextLesson.id}`}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Next lesson →
            </a>
          ) : (
            <a
              href={`/courses/${lesson.courseId}`}
              className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Finish course
            </a>
          )}
        </div>
      </section>
    </main>
  );
}