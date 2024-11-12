"use client";

export default function ResultMessage({ hasSubmitted, isCorrect }) {
  if (!hasSubmitted) return null;

  return (
    <p
      className={`mt-6 text-2xl font-bold ${
        isCorrect ? "text-green-400" : "text-red-400"
      }`}
    >
      {isCorrect
        ? "🎉 Correct! You picked the real NASA image!"
        : "❌ Incorrect! That was the AI-generated image."}
    </p>
  );
}
