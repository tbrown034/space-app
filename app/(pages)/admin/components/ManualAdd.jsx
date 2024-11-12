"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarIcon,
  PaperAirplaneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { calculateRandomDate, formatDateForUi } from "@/app/utils/dateUtils";

const ManualAdd = ({ selectedDate, setSelectedDate, handleGeneratePair }) => {
  const handleSetToday = () => setSelectedDate(new Date());
  const handleSetRandomDate = () => setSelectedDate(calculateRandomDate());

  const handlePreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const isTodaySelected =
    formatDateForUi(selectedDate) === formatDateForUi(new Date());

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold text-teal-300">Add Manually</h3>

      {/* Button Group */}
      <div className="flex w-full gap-2">
        <button
          onClick={handleSetToday}
          className="flex-1 px-4 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Today
        </button>
        <button
          onClick={handleSetRandomDate}
          className="flex-1 px-4 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Random
        </button>
      </div>

      {/* Date Picker Input */}
      <div className="relative w-full max-w-xs">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
          className="w-full px-4 py-2 text-black bg-teal-100 rounded-lg focus:outline-none"
          placeholderText="Select a date"
        />
        <CalendarIcon className="absolute w-5 h-5 text-teal-600 transform -translate-y-1/2 left-3 top-1/2" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full gap-2">
        <button
          onClick={handlePreviousDay}
          className="flex items-center justify-center flex-1 px-4 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Previous
        </button>
        <button
          onClick={handleNextDay}
          disabled={isTodaySelected}
          className={`flex items-center justify-center flex-1 px-4 py-2 text-lg font-semibold text-white rounded-lg ${
            isTodaySelected ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Next
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Generate Pair Button */}
      <button
        onClick={handleGeneratePair}
        className="flex items-center justify-center w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        <PaperAirplaneIcon className="w-5 h-5 mr-2 rotate-45" />
        Generate Pair
      </button>
    </div>
  );
};

export default ManualAdd;
