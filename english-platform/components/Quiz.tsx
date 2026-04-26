"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Props = {
  questions: Question[];
};

export default function Quiz({ questions }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  function chooseAnswer(questionIndex: number, answer: string) {
    if (isSubmitted) return;

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  }

  function checkQuiz() {
    setIsSubmitted(true);
  }

  function resetQuiz() {
    setSelectedAnswers(Array(questions.length).fill(""));
    setIsSubmitted(false);
  }

  const score = questions.reduce((total, question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      return total + 1;
    }

    return total;
  }, 0);

  return (
    <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Quiz</h2>

      <p className="text-gray-600 mb-6">
        Сабақты түсінгеніңді тексеру үшін сұрақтарға жауап бер.
      </p>

      <div className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div
            key={question.question}
            className="bg-blue-50 rounded-2xl p-5"
          >
            <h3 className="font-bold mb-4">
              {questionIndex + 1}. {question.question}
            </h3>

            <div className="grid gap-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswers[questionIndex] === option;
                const isCorrect = option === question.correctAnswer;
                const isWrong = isSubmitted && isSelected && !isCorrect;

                let optionClass =
                  "w-full text-left rounded-xl border px-4 py-3 bg-white hover:bg-blue-100 transition";

                if (isSelected) {
                  optionClass =
                    "w-full text-left rounded-xl border px-4 py-3 bg-blue-600 text-white transition";
                }

                if (isSubmitted && isCorrect) {
                  optionClass =
                    "w-full text-left rounded-xl border px-4 py-3 bg-green-600 text-white transition";
                }

                if (isWrong) {
                  optionClass =
                    "w-full text-left rounded-xl border px-4 py-3 bg-red-500 text-white transition";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(questionIndex, option)}
                    className={optionClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          type="button"
          onClick={checkQuiz}
          className="mt-6 w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
        >
          Check answers
        </button>
      ) : (
        <div className="mt-6">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-4">
            <h3 className="text-xl font-bold text-green-700 mb-1">
              Your score: {score}/{questions.length}
            </h3>

            <p className="text-gray-600">
              {score === questions.length
                ? "Керемет! Барлығы дұрыс."
                : "Жақсы! Қате жауаптарды қарап, қайта көр."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetQuiz}
            className="w-full bg-gray-900 text-white rounded-xl py-3 font-semibold hover:bg-blue-600 transition"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}