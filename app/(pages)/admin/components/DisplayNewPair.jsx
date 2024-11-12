// app/(pages)/admin/components/DisplayNewPair.jsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import { formatDateForUi } from "@/app/utils/dateUtils";

const DisplayNewPair = ({ apodData, aiImageUrl, loading }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!apodData) return null;

  // Set character limit for truncation
  const CHAR_LIMIT = 300;
  const truncatedExplanation = apodData.explanation.slice(0, CHAR_LIMIT);

  return (
    <div className="max-w-lg p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="mb-3 text-3xl font-semibold text-center text-black">
        {apodData.title}
      </h2>

      {/* Date and Copyright */}
      <p className="mb-1 text-sm text-center text-gray-700">
        <strong>Date:</strong> {formatDateForUi(new Date(apodData.date))}
      </p>
      <p className="mb-4 text-sm text-center text-gray-700">
        <strong>Copyright:</strong> {apodData.copyright || "Public Domain"}
      </p>

      {/* Explanation Text with Show More/Show Less */}
      <p className="text-center text-gray-800">
        {showFullText ? apodData.explanation : truncatedExplanation}
        {apodData.explanation.length > CHAR_LIMIT && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="ml-2 text-blue-500 hover:underline"
          >
            {showFullText ? "Show Less" : "Show More"}
          </button>
        )}
      </p>

      {/* Image Display for NASA APOD and AI Generated Image */}
      <div className="flex justify-between mt-6 space-x-6">
        {/* NASA APOD Image */}
        <div className="flex-1 text-center">
          <h3 className="mb-2 font-semibold text-gray-800">NASA APOD</h3>
          <div className="relative w-40 h-40 mx-auto transition-transform duration-200 hover:scale-105">
            <Image
              src={apodData.url}
              alt="NASA APOD"
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
            />
          </div>
        </div>

        {/* AI Generated Image with Loading Spinner */}
        <div className="flex-1 text-center">
          <h3 className="mb-2 font-semibold text-gray-800">
            AI Generated Image
          </h3>
          <div className="relative flex items-center justify-center w-40 h-40 mx-auto transition-transform duration-200 bg-gray-100 rounded-md shadow-md hover:scale-105">
            {loading ? (
              <LoadingSpinner /> // Show loading spinner while AI image is being generated
            ) : (
              aiImageUrl && (
                <Image
                  src={aiImageUrl}
                  alt="AI Generated"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={async () => {
          try {
            const response = await fetch("/api/savePhotos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nasaImageUrl: apodData.url,
                aiImageUrl: aiImageUrl,
                metadata: {
                  title: apodData.title,
                  date: apodData.date,
                  explanation: apodData.explanation,
                },
              }),
            });

            if (!response.ok) throw new Error("Failed to save image pair");
            alert("Image pair saved successfully!");
          } catch (error) {
            console.error("Error saving image pair:", error);
            alert("An error occurred while saving the image pair.");
          }
        }}
        className="w-full px-4 py-3 mt-8 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Save
      </button>
    </div>
  );
};

export default DisplayNewPair;
