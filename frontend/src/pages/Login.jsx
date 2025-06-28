// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";
import loginIllustration from "../assets/login-illustration.png";
import bgImage from "../assets/bg-space.jpg";

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login(user);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 grid md:grid-cols-2 gap-8 backdrop-blur-lg">
        {/* Left Side - Logo & Illustration */}
        <div className="flex flex-col justify-between items-center text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">SkillSync</h1>
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-auto rounded-lg object-contain"
          />
          <button
            onClick={toggleTheme}
            className="mt-4 text-sm text-indigo-500 dark:text-indigo-300 underline"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">Log in to your account</h2>

          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              Log In
            </button>
          </form>

          <p className="text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}