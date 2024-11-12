"use client";
import React, { useState } from "react";
import ManualAdd from "./components/ManualAdd";
import DisplayNewPair from "./components/DisplayNewPair";
import UsersSection from "./components/UsersSection";
import ImagePairsSection from "./components/ImagePairsSection";
import { formatDateForApi } from "@/app/utils/dateUtils";

const AdminPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch NASA APOD data and generate AI image
  const fetchApodData = async (date) => {
    try {
      setLoading(true);
      setError(null);
      setAiImageUrl(null);

      const formattedDate = formatDateForApi(date);
      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to fetch APOD data");

      const data = await response.json();
      setApodData(data);

      const aiResponse = await fetch("/api/generateAiImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: data }),
      });

      if (!aiResponse.ok) throw new Error("Failed to generate AI image");

      const aiData = await aiResponse.json();
      setAiImageUrl(aiData.imageUrl);
    } catch (err) {
      setError(err.message);
      setApodData(null);
      setAiImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePair = () => fetchApodData(selectedDate);

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6 ">
      <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>

      {/* Manual Add Section */}
      <ManualAdd
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleGeneratePair={handleGeneratePair}
      />

      {/* Users Section */}
      <div className="w-full max-w-lg">
        <UsersSection />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display New Pair */}
      <DisplayNewPair
        apodData={apodData}
        aiImageUrl={aiImageUrl}
        loading={loading}
      />

      {/* Image Pairs Section */}
      <ImagePairsSection />
    </div>
  );
};

export default AdminPage;
