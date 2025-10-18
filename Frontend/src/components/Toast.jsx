import { useEffect } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500"
  }[type];

  return (
    <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white ${bgColor} z-50`}>
      {message}
    </div>
  );
}
