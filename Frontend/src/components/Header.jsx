import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dashboard pages pe header hide
  const isDashboard =
    location.pathname.startsWith("/org") ||
    location.pathname.startsWith("/member");

  if (isDashboard) return null;

  // Solutions data with emojis
  const solutions = [
    {
      emoji: "🎓",
      title: "Educational Institutions", 
      description: "Issue and verify student certificates",
      href: "/solutions/education"
    },
    {
      emoji: "🏢",
      title: "Corporate Enterprises",
      description: "Employee certification and verification", 
      href: "/solutions/corporate"
    },
    {
      emoji: "🚀",
      title: "Training Academies",
      description: "Course completion certificates",
      href: "/solutions/training"
    },
    {
      emoji: "🛡️",
      title: "Government Organizations",
      description: "Official document verification",
      href: "/solutions/government"
    }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* 🔹 Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  CertiVerify
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1">
                  by TrueMark
                </span>
              </div>
            </Link>

            {/* 🔹 Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-all duration-200 hover:text-blue-600 ${
                  location.pathname === "/" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              
              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-all duration-200">
                  <span>Solutions</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`} />
                </button>
                
                {isSolutionsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {/* YAHAN PAR EMOJI SOLUTION USE HUA HAI */}
                      {solutions.map((solution, index) => (
                        <Link
                          key={index}
                          to={solution.href}
                          className="flex items-start space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200 text-xl">
                            {solution.emoji}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                              {solution.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {solution.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/pricing"
                className={`font-medium transition-all duration-200 hover:text-blue-600 ${
                  location.pathname === "/pricing" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Pricing
              </Link>

              <Link
                to="/about"
                className={`font-medium transition-all duration-200 hover:text-blue-600 ${
                  location.pathname === "/about" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`font-medium transition-all duration-200 hover:text-blue-600 ${
                  location.pathname === "/contact" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 🔹 Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/signin"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
              </Link>
            </div>

            {/* 🔹 Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100"
            >
              {isOpen ? (
                <HiX className="w-6 h-6 text-gray-700" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                    location.pathname === "/" 
                      ? "bg-blue-50 text-blue-600 border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Home
                </Link>

                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                    Solutions
                  </h3>
                  <div className="space-y-2">
                    {/* MOBILE MENU MEIN BHI EMOJI SOLUTION */}
                    {solutions.map((solution, index) => (
                      <Link
                        key={index}
                        to={solution.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                          {solution.emoji}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-700">
                            {solution.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {solution.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {["Pricing", "About", "Contact"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                      location.pathname === `/${item.toLowerCase()}` 
                        ? "bg-blue-50 text-blue-600 border border-blue-100" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-gray-100 pt-6 mt-6 space-y-3">
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center font-medium text-gray-700 border border-gray-200 py-3 px-4 rounded-xl hover:border-gray-300 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
}