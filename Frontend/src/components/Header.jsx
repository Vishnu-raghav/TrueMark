import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Header ko sirf public pages me dikhana (agar tu chaahe conditionally hide karna)
  const isDashboard =
    location.pathname.startsWith("/org") ||
    location.pathname.startsWith("/member");

  if (isDashboard) return null; // Dashboard pages pe header hide

  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 flex justify-center">
      <div className="w-full bg-white/20 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex justify-between items-center">
        {/* 🔹 Logo */}
        <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
          TrueMark
        </div>

        {/* 🔹 Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            Contact
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gray-200 text-blue-700 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
          >
            Sign Up
          </Link>
        </nav>

        {/* 🔹 Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full max-w-5xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-6 flex flex-col space-y-4 md:hidden animate-slideDown">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/signin", label: "Sign In", button: true },
            { to: "/signup", label: "Sign Up", secondary: true },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`${
                item.button
                  ? "px-4 py-2 bg-blue-600 text-white rounded-lg text-center shadow-md hover:bg-blue-700"
                  : item.secondary
                  ? "px-4 py-2 bg-gray-200 text-blue-700 rounded-lg text-center shadow-md hover:bg-gray-300"
                  : "text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20"
              } transition-all duration-300 transform hover:scale-105`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
