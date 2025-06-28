// src/components/ResumeUpload.jsx
import React, { useRef } from "react";

export default function ResumeUpload({ onFileSelect }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Upload Your Resume</h2>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf, .doc, .docx, .txt"
          onChange={handleFileChange}
          className="p-3 border rounded-md bg-gray-50"
        />
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Accepted formats: PDF, DOC, DOCX, TXT
      </p>
    </div>
  );
}