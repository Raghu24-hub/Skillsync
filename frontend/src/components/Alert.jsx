// src/components/Alert.jsx
export default function Alert({ type = "success", message }) {
  const baseClasses =
    "p-3 rounded-md text-sm font-medium mb-4 flex items-center shadow transition-all duration-300";

  const styles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
  };

  const icon = type === "success" ? "✅" : "❌";

  return (
    <div className={`${baseClasses} ${styles[type]}`}>
      <span className="mr-2">{icon}</span>
      <span>{message}</span>
    </div>
  );
}