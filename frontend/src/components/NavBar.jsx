// src/components/NavBar.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears token + user from context
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SkillSync</h1>
      <div className="flex gap-4 items-center">
        <span className="text-sm">Welcome, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}