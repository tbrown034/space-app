"use client";

import React, { useState } from "react";

const ImagePairsSection = () => {
  const [imagePairs, setImagePairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const handleShowImagePairs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getImagePairs");
      if (!response.ok) throw new Error("Failed to fetch image pairs");
      const data = await response.json();
      setImagePairs(data);
      setShowTable(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">
        Image Pairs
      </h3>

      <button
        onClick={handleShowImagePairs}
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Show Image Pairs
      </button>

      {loading && <p className="mt-4 text-center text-gray-700">Loading...</p>}

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {showTable && imagePairs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full mt-4 text-sm text-left text-gray-700">
            <thead className="text-white bg-teal-500">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">NASA Image URL</th>
                <th className="px-4 py-2">AI Image URL</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {imagePairs.map((pair) => (
                <tr key={pair.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{pair.id}</td>
                  <td className="px-4 py-2">
                    <a
                      href={pair.nasaImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      NASA Image
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={pair.aiImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      AI Image
                    </a>
                  </td>
                  <td className="px-4 py-2">{pair.metadataTitle}</td>
                  <td className="px-4 py-2">
                    {new Date(pair.metadataDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTable && imagePairs.length === 0 && (
        <p className="mt-4 text-center text-gray-700">No image pairs found.</p>
      )}
    </div>
  );
};

export default ImagePairsSection;
