"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import Instructions from "./Instructions";
import MetadataSection from "./MetadataSection";
import ImagePair from "./ImagePair";
import ResultMessage from "./ResultMessage";

export default function RandomPlay() {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch a new random image pair
  const fetchRandomPair = async () => {
    if (loading) return; // Prevent duplicate fetches
    setLoading(true);
    try {
      const response = await fetch("/api/getRandomPair", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch image pair");
      const data = await response.json();

      // Set `isNasaFirst` once when the data is fetched
      const isNasaFirst = Math.random() > 0.5;
      const newPair = { ...data, isNasaFirst };

      // Update history with the new image pair
      const updatedHistory = [...history.slice(0, currentIndex + 1), newPair];
      setHistory(updatedHistory);
      setCurrentIndex(updatedHistory.length - 1);

      // Reset state
      setSelectedImage(null);
      setIsCorrect(null);
      setHasSubmitted(false);
    } catch (error) {
      console.error("Error fetching image pair:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    const currentPair = history[currentIndex];
    const correctAnswer = currentPair.isNasaFirst ? "nasa" : "ai";
    setIsCorrect(selectedImage === correctAnswer);
    setHasSubmitted(true);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(null);
      setIsCorrect(null);
      setHasSubmitted(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(null);
      setIsCorrect(null);
      setHasSubmitted(false);
    } else {
      fetchRandomPair();
    }
  };

  useEffect(() => {
    fetchRandomPair();
  }, []);

  const currentPair = history[currentIndex];

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6">
      <Instructions />
      <h1 className="text-3xl font-bold text-teal-400">Random Play Mode</h1>

      {loading && <LoadingSpinner />}

      {currentPair && (
        <>
          <MetadataSection metadata={currentPair.metadata} />
          <ImagePair
            isNasaFirst={currentPair.isNasaFirst}
            imageData={currentPair}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            hasSubmitted={hasSubmitted}
            isCorrect={isCorrect}
          />

          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedImage || hasSubmitted}
              className={`px-6 py-2 text-lg font-semibold text-white rounded-lg ${
                !selectedImage || hasSubmitted
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Submit
            </button>
          </div>

          <div className="flex justify-between gap-6 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex <= 0}
              className={`px-6 py-2 text-lg font-semibold text-white rounded-lg ${
                currentIndex <= 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
            >
              Next
            </button>
          </div>

          <ResultMessage hasSubmitted={hasSubmitted} isCorrect={isCorrect} />
        </>
      )}
    </div>
  );
}
