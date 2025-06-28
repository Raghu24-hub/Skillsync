import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-100 text-gray-900">
      {/* Top Nav */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow">
        <h1 className="text-3xl font-bold text-indigo-600">SkillSync</h1>
        <nav className="flex gap-6">
          <Link to="/login" className="hover:underline text-gray-800 font-medium">
            Login
          </Link>
          <Link to="/signup" className="hover:underline text-gray-800 font-medium">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Upload. Analyze. Improve.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Get AI-powered insights to boost your resume match score. Match your resume to job descriptions in seconds — for Free.
        </p>

        <button
          onClick={() => navigate("/analyze")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
        >
          See Job Matching Results
        </button>

        {/* Feature Highlight Section */}
        <section className="mt-20 max-w-5xl w-full px-4 md:px-10">
          <div className="bg-white/90 shadow-xl rounded-xl p-8 flex flex-col md:flex-row justify-between gap-8 items-center text-left">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-700 leading-snug">
                SkillSync helps increase your interview chances by up to{" "}
                <span className="text-blue-500">50%</span>
              </h3>
            </div>
            <div className="flex-1 text-gray-700 text-sm leading-relaxed">
              <p className="mb-2">
                Most job seekers never hear back after applying. Why?
              </p>
              <p className="mb-2">
                Companies use <strong>Applicant Tracking Systems (ATS)</strong> to filter resumes based on keywords.
              </p>
              <p>
                SkillSync analyzes your resume and job description using AI, helping you add the right keywords and highlight your skills to get noticed by recruiters.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}