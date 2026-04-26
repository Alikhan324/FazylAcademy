"use client";

import { useEffect, useState } from "react";

type Props = {
  courseId: number;
  lessonId: number;
};

export default function LessonCompleteButton({ courseId, lessonId }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const storageKey = `completed-lessons-course-${courseId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const completedLessons = JSON.parse(saved);
      setIsCompleted(completedLessons.includes(lessonId));
    }
  }, [lessonId, storageKey]);

  function toggleComplete() {
    const saved = localStorage.getItem(storageKey);
    const completedLessons: number[] = saved ? JSON.parse(saved) : [];

    let updatedLessons;

    if (completedLessons.includes(lessonId)) {
      updatedLessons = completedLessons.filter((id) => id !== lessonId);
      setIsCompleted(false);
    } else {
      updatedLessons = [...completedLessons, lessonId];
      setIsCompleted(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(updatedLessons));
  }

  return (
    <button
      onClick={toggleComplete}
      className={
        isCompleted
          ? "w-full bg-green-600 text-white rounded-xl py-3 font-semibold hover:bg-green-700 transition"
          : "w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
      }
    >
      {isCompleted ? "✅ Completed" : "Mark as completed"}
    </button>
  );
}