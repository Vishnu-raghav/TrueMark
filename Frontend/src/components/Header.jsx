import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const location = useLocation();

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ FIXED: Sirf actual dashboard pages pe header hide, signup/signin nahi
  const isDashboard = 
    location.pathname.startsWith("/org/dashboard") ||
    location.pathname.startsWith("/member/dashboard") ||
    location.pathname === "/org" ||
    location.pathname === "/member";

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
                  Proofin
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1">
                  by Vishnu
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
              {/* <div 
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
              </div> */}

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

            {/* 🔹 Desktop Auth Buttons with Premium Dropdown */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Sign In Link */}
              <Link
                to="/signin"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
              >
                Sign In
              </Link>
              
              {/* Get Started Free Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsGetStartedOpen(true)}
                onMouseLeave={() => setIsGetStartedOpen(false)}
              >
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 group">
                  <span>Get Started Free</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isGetStartedOpen ? "rotate-180" : ""
                  }`} />
                </button>
                
                {/* Premium Dropdown Menu */}
                {isGetStartedOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                        Start Your Journey
                      </div>
                      
                      {/* Organization Option */}
                      <Link
                        to="/org/signup"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-100"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                          <span className="text-white text-lg">🏢</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                            Register Organization
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Issue & verify certificates
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </Link>
                      
                      {/* Member Option */}
                      <Link
                        to="/signup"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-100"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                          <span className="text-white text-lg">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-green-700">
                            Join as Member
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Receive & manage certificates
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </Link>
                    </div>
                    
                    {/* Free Trial Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center text-xs text-gray-500">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        No credit card required • 14-day free trial
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

              {/* 🔹 Mobile Auth Buttons with Dropdown Options */}
              <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
                {/* Sign In Button */}
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center font-medium text-gray-700 border border-gray-200 py-3 px-4 rounded-xl hover:border-blue-600 transition-all duration-200"
                >
                  Sign In
                </Link>

                {/* Get Started Free Options */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                    Get Started Free
                  </div>
                  
                  {/* Organization Option */}
                  <Link
                    to="/org/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg">🏢</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div>Register Organization</div>
                      <div className="text-blue-100 text-sm font-normal">Issue certificates</div>
                    </div>
                  </Link>
                  
                  {/* Member Option */}
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div>Join as Member</div>
                      <div className="text-gray-300 text-sm font-normal">Receive certificates</div>
                    </div>
                  </Link>
                </div>
                
                {/* Free Trial Info */}
                <div className="text-center pt-2">
                  <div className="text-xs text-gray-500 flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    No credit card required
                  </div>
                </div>
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