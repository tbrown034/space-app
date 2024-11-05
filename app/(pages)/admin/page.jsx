"use client";

import React, { useState } from "react";
import DatePickerSection from "./components/DatePickerSection";
import DisplayNewPair from "./components/DisplayNewPair";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import { formatDateForApi } from "@/app/utils/dateUtils";

const AdminPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for AI image generation

  const fetchApodData = async (date) => {
    try {
      setLoading(true); // Start loading when generating new pair
      setError(null); // Clear any previous errors
      setAiImageUrl(null); // Clear the previous AI image

      // Fetch APOD data
      const formattedDate = formatDateForApi(date);
      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to fetch APOD data");
      const data = await response.json();
      setApodData(data);

      // Fetch AI-generated image
      const aiResponse = await fetch("/api/generateAiImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: data }),
      });
      if (!aiResponse.ok) throw new Error("Failed to generate AI image");
      const aiData = await aiResponse.json();

      setAiImageUrl(aiData.imageUrl); // Set the generated AI image URL
    } catch (err) {
      setError(err.message);
      setApodData(null);
      setAiImageUrl(null);
    } finally {
      setLoading(false); // End loading state after response
    }
  };

  const handleGeneratePair = () => fetchApodData(selectedDate);

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6 ">
      <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>

      <DatePickerSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleGeneratePair={handleGeneratePair}
      />

      {error && <p className="text-red-500">{error}</p>}

      <DisplayNewPair
        apodData={apodData}
        aiImageUrl={aiImageUrl}
        loading={loading} // Pass loading state to DisplayNewPair
      />
    </div>
  );
};

export default AdminPage;
