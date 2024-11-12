"use client";

import { useState } from "react";

export default function MetaDataSection({ metadata }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div className="text-center">
      <h2 className="mb-2 text-2xl font-semibold text-white">
        {metadata.title}
      </h2>
      <p className="mb-4 text-sm italic text-gray-300">
        {new Date(metadata.date).toLocaleDateString()}
      </p>

      {/* Explanation with Toggle */}
      <p className="mb-4 text-gray-200">
        {showMore
          ? metadata.explanation
          : `${metadata.explanation.slice(0, 200)}${
              metadata.explanation.length > 200 ? "..." : ""
            }`}
        {metadata.explanation.length > 200 && (
          <button
            onClick={toggleShowMore}
            className="ml-2 text-blue-400 underline hover:text-blue-600"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
}
