"use client";
import { useState } from "react";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/getUsers");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShowUsers}
      className="flex-1 px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
    >
      {loading ? "Loading Users..." : "Show Users"}
    </button>
  );
};

export default UsersSection;
