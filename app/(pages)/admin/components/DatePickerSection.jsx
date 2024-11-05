// app/(pages)/admin/components/DatePickerSection.jsx

"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    <div className="flex flex-col items-center mt-4 space-y-4">
      <button
        onClick={handleSetToday}
        className="px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Today
      </button>
      <button
        onClick={handleSetRandomDate}
        className="px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Random
      </button>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/dd/yyyy"
        className="px-4 py-2 text-black bg-white rounded-md center"
      />
      <div className="flex gap-2">
        <button
          onClick={handlePreviousDay}
          className="px-4 py-2 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Previous Day
        </button>
        <button
          onClick={handleNextDay}
          disabled={isTodaySelected}
          className={`px-4 py-2 text-lg font-semibold text-white rounded-lg ${
            isTodaySelected ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Next Day
        </button>
      </div>
      <button
        onClick={handleGeneratePair}
        className="px-6 py-3 mt-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Generate Pair
      </button>
    </div>
  );
};

export default DatePickerSection;
