"use client";

import React, { useState } from "react";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
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
      setShowUsers(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">
        Users
      </h3>

      <button
        onClick={handleShowUsers}
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Show Users
      </button>

      {loading && <p className="mt-4 text-center text-gray-700">Loading...</p>}

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {showUsers && users.length > 0 && (
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-2 text-center text-gray-800 bg-gray-100 rounded-md"
            >
              {user.name || "No Name"} - {user.email || "No Email"}
            </li>
          ))}
        </ul>
      )}

      {showUsers && users.length === 0 && (
        <p className="mt-4 text-center text-gray-700">No users found.</p>
      )}
    </div>
  );
};

export default UsersSection;
