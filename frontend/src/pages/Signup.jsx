// src/pages/Signup.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";
import signupIllustration from "../assets/login-illustration.png";
import bgImage from "../assets/bg-space.jpg";

export default function Signup() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login(user);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 grid md:grid-cols-2 gap-8 backdrop-blur-lg">
        {/* Left Side - Illustration */}
        <div className="flex flex-col justify-between items-center text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">SkillSync</h1>
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full h-auto object-contain rounded-lg"
          />
          <button
            onClick={toggleTheme}
            className="mt-4 text-sm text-indigo-500 dark:text-indigo-300 underline"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">Create your account</h2>

          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}