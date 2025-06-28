// src/components/AnalyzeResume.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AnalyzeResume({ resumeFile, jobDescription }) {
  const [loading, setLoading] = useState(false);
  const [matchScore, setMatchScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      setError("Please upload resume and paste job description.");
      return;
    }

    setLoading(true);
    setError("");
    setMatchScore(null);
    setSuggestions([]);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMatchScore(response.data.score);
      setSuggestions(response.data.suggestions);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleAnalyze}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {matchScore !== null && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">
            Match Score: {matchScore}%
          </h3>
          <h4 className="text-md font-semibold mb-1 text-gray-700">Suggestions:</h4>
          <ul className="list-disc ml-6 text-sm text-gray-600">
            {suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}