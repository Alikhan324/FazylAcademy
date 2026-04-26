"use client";

import { useEffect, useState } from "react";

type Props = {
  courseId: number;
  totalLessons: number;
};

export default function CourseProgress({ courseId, totalLessons }: Props) {
  const [completedCount, setCompletedCount] = useState(0);

  const storageKey = `completed-lessons-course-${courseId}`;

  useEffect(() => {
    function updateProgress() {
      const saved = localStorage.getItem(storageKey);
      const completedLessons: number[] = saved ? JSON.parse(saved) : [];
      setCompletedCount(completedLessons.length);
    }

    updateProgress();

    window.addEventListener("storage", updateProgress);

    return () => {
      window.removeEventListener("storage", updateProgress);
    };
  }, [storageKey]);

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Your progress</h2>
        <span className="text-blue-600 font-semibold">
          {completedCount}/{totalLessons} lessons
        </span>
      </div>

      <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-gray-600 mt-3 text-sm">
        {progress}% completed
      </p>
    </div>
  );
}