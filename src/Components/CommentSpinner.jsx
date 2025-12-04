// src/Components/CommentSpinner.jsx
import React from "react";

export default function CommentSpinner({
  size = "md", // "sm" | "md" | "lg"
  text = "Loading comments...",
  className = "",
  ariaLabel = "Loading comments",
}) {
  const sizeClasses =
    size === "sm"
      ? "w-6 h-6 border-2"
      : size === "lg"
      ? "w-16 h-16 border-4"
      : "w-10 h-10 border-4"; // md default

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div
        className={`${sizeClasses} rounded-full animate-spin border-blue-500 border-t-transparent dark:border-blue-300`}
      />
      {text ? (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>
      ) : null}
    </div>
  );
}