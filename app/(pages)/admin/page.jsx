"use client"; // Ensures this component runs on the client

import Link from "next/link";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

// Helper function to format date as YYYY-MM-DD for NASA API
const formatDateForApi = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to format date as MM/DD/YYYY for UI display
const formatDateForUi = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const AdminPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showGenerateOptions, setShowGenerateOptions] = useState(false);
  const [apodData, setApodData] = useState(null); // Stores fetched NASA APOD data
  const [error, setError] = useState(null); // Stores any error message

  // Fetch data from the NASA APOD API
  const fetchApodData = async (date) => {
    try {
      const formattedDate = formatDateForApi(date); // Format date for API
      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to fetch APOD data");
      const data = await response.json();
      setApodData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setApodData(null);
    }
  };

  // Helper to calculate a random date
  const calculateRandomDate = () => {
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date();
    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
  };

  // Button handlers
  const handleSetToday = () => setSelectedDate(new Date());
  const handleSetRandomDate = () => setSelectedDate(calculateRandomDate());
  const handleGeneratePair = () => fetchApodData(selectedDate);

  // Navigate to the previous day
  const handlePreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
  };

  // Navigate to the next day
  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  // Disable "Next Day" if selectedDate is today
  const isTodaySelected =
    formatDateForApi(selectedDate) === formatDateForApi(new Date());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 ">
      <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>

      {/* Toggle button to show/hide options */}
      <button
        onClick={() => setShowGenerateOptions(!showGenerateOptions)}
        className="px-6 py-3 mt-4 text-lg font-semibold text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
      >
        {showGenerateOptions ? "Hide Options" : "Generate New Pair"}
      </button>

      {/* Generate options */}
      {showGenerateOptions && (
        <div className="flex flex-col items-center mt-4 space-y-4">
          {/* Today Button */}
          <button
            onClick={handleSetToday}
            className="px-6 py-3 text-lg font-semibold text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
          >
            Today
          </button>

          {/* Random Button */}
          <button
            onClick={handleSetRandomDate}
            className="px-6 py-3 text-lg font-semibold text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
          >
            Random
          </button>

          {/* Date Picker */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy" // Display format for the user
            className="px-4 py-2 text-gray-800 bg-white rounded-md shadow-md focus:outline-none"
          />

          {/* Next and Previous Day Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePreviousDay}
              className="px-4 py-2 text-lg font-semibold text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
            >
              Previous Day
            </button>
            <button
              onClick={handleNextDay}
              disabled={isTodaySelected}
              className={`px-4 py-2 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ${
                isTodaySelected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Next Day
            </button>
          </div>

          {/* Generate Pair Button */}
          <button
            onClick={handleGeneratePair}
            className="px-6 py-3 mt-3 text-lg font-semibold text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
          >
            Generate Pair
          </button>
        </div>
      )}

      {/* Display APOD Data */}
      {apodData && (
        <div className="max-w-lg p-4 mt-8 text-gray-800 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">{apodData.title}</h2>
          <p className="mb-2 text-sm text-gray-600">
            Date: {formatDateForUi(new Date(apodData.date))}
          </p>
          <p className="mb-2 text-sm text-gray-600">
            Copyright: {apodData.copyright || "Public Domain"}
          </p>
          <p className="mb-4">{apodData.explanation}</p>
          {apodData.url && (
            <Image
              src={apodData.url}
              alt={apodData.title}
              width={600}
              height={400}
              className="rounded-md"
            />
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Navigation Links */}
      <div className="flex gap-4 mt-8">
        <Link
          href="/"
          className="p-3 text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
        >
          Home
        </Link>
        <Link
          href="/play"
          className="p-3 text-white transition duration-300 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
        >
          Play
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
