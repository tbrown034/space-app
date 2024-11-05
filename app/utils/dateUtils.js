// app/utils/dateUtils.js

// Format date as YYYY-MM-DD for NASA API
export const formatDateForApi = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Format date as MM/DD/YYYY for UI display
export const formatDateForUi = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Generate a random date between a start date and today
export const calculateRandomDate = () => {
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date();
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
};
