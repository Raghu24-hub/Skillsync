// src/components/JobDescriptionInput.jsx
import React from "react";


export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-xl mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Paste Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows="8"
        placeholder="Paste the job description here..."
        className="w-full p-4 border rounded-md resize-none bg-gray-50"
      />
    </div>
  );
}