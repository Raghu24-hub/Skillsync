import { useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const { matchScore, matchedSkills, missingSkills } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-purple-50 to-indigo-100">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 animate-fade-in">
          📊 Match Results
        </h2>

        {matchScore !== undefined ? (
          <>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6 rounded-lg text-lg shadow-inner mb-6">
              <strong>Match Score:</strong> {matchScore}%
            </div>

            <div className="text-left mb-6">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                ✅ Matched Skills:
              </h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                {matchedSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                ❌ Missing/Recommended Skills:
              </h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                {missingSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-md mt-4 animate-pulse">
            Something went wrong. Please try again. 😕
          </p>
        )}
      </div>
    </div>
  );
}