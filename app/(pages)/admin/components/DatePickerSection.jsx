// app/(pages)/admin/components/DatePickerSection.jsx

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

const DatePickerSection = ({
  selectedDate,
  setSelectedDate,
  handleGeneratePair,
}) => {
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
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
      {/* Section Title */}
      <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">
        Add Manually
      </h3>

      <div className="flex flex-col items-center space-y-4">
        {/* Today and Random Buttons */}
        <button
          onClick={handleSetToday}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Today
        </button>

        <button
          onClick={handleSetRandomDate}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Random
        </button>

        {/* DatePicker with Calendar Icon */}
        <div className="relative w-full max-w-xs">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="w-full px-4 py-2 pl-10 text-black bg-gray-300 rounded-md"
            placeholderText="Select a date"
          />
          <CalendarIcon className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
        </div>

        {/* Previous and Next Day Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePreviousDay}
            className="flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Previous
          </button>
          <button
            onClick={handleNextDay}
            disabled={isTodaySelected}
            className={`flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white rounded-lg ${
              isTodaySelected ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            Next
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Generate Pair Button with Send Icon */}
        <button
          onClick={handleGeneratePair}
          className="flex items-center justify-center w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          <PaperAirplaneIcon className="w-5 h-5 mr-2 rotate-45" />
          Generate Pair
        </button>
      </div>
    </div>
  );
};

export default DatePickerSection;
