"use client";
import React, { useState } from "react";

const ImagePairsSection = () => {
  const [imagePairs, setImagePairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowImagePairs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getImagePairs");
      if (!response.ok) throw new Error("Failed to fetch image pairs");
      const data = await response.json();
      setImagePairs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShowImagePairs}
      className="flex-1 px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
    >
      {loading ? "Loading Image Pairs..." : "Show Image Pairs"}
    </button>
  );
};

export default ImagePairsSection;
