// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="relative mt-10 flex justify-center z-50">
//       <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
//           TrueMark
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/"
//             className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
//           >
//             About
//           </Link>
//           <Link
//             to="/features"
//             className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
//           >
//             Features
//           </Link>
//           <Link
//             to="/contact"
//             className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
//           >
//             Contact
//           </Link>
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
//           >
//             Sign In
//           </Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? (
//               <HiX className="w-6 h-6 text-gray-700" />
//             ) : (
//               <HiMenu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//   <div className="absolute top-full mt-3 w-full max-w-4xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-6 flex flex-col space-y-4 md:hidden animate-slideDown">
//     <Link
//       to="/"
//       className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//       onClick={() => setIsOpen(false)}
//     >
//       Home
//     </Link>
//     <Link
//       to="/about"
//       className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//       onClick={() => setIsOpen(false)}
//     >
//       About
//     </Link>
//     <Link
//       to="/features"
//       className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//       onClick={() => setIsOpen(false)}
//     >
//       Features
//     </Link>
//     <Link
//       to="/contact"
//       className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//       onClick={() => setIsOpen(false)}
//     >
//       Contact
//     </Link>
//     <Link
//       to="/login"
//       className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-center"
//       onClick={() => setIsOpen(false)}
//     >
//       Sign In
//     </Link>
//   </div>
// )}
//     </header>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl z-50 flex justify-center">
      <div className="w-full bg-white/20 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
          TrueMark
        </div>

        {/* Desktop Nav */}
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
            to="/features"
            className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full max-w-4xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-6 flex flex-col space-y-4 md:hidden animate-slideDown">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/features"
            className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-center"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
