// src/pages/Analyze.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Analyze() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      if (resumeFile) formData.append("resume", resumeFile);
      formData.append("resumeText", resumeText);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post("http://localhost:5000/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Upload Resume & Paste Job Description
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1A: Upload Resume (Optional) */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Step 1: Upload Resume (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="block w-full text-sm border rounded p-2"
            />
          </div>

          {/* OR Separator */}
          <div className="text-center text-sm text-gray-500 font-semibold">OR</div>

          {/* Step 1B: Paste Resume Text */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Paste Your Resume Text Here
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows="6"
              className="block w-full border rounded p-3 text-sm"
              placeholder="Paste your resume content here..."
              required
            />
          </div>

          {/* Step 2: Paste Job Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Step 2: Paste Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="6"
              className="block w-full border rounded p-3 text-sm"
              placeholder="Paste job description here..."
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}

        {/* AI Result */}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Match Score:</h3>
            <p className="text-xl font-bold text-indigo-700 mb-4">{result.matchScore}%</p>

            <h4 className="font-semibold mb-1">Matched Skills:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
              {result.matchedSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>

            <h4 className="font-semibold mb-1">Missing Skills:</h4>
            <ul className="list-disc list-inside text-sm text-red-700 mb-2">
              {result.missingSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4 mb-1">Suggestions:</h4>
            <p className="text-sm text-gray-800">{result.suggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
}