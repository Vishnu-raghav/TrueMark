


// import { Routes, Route } from "react-router-dom";

// // Layouts
// import PublicLayout from "./layouts/PublicLayout";
// import OrgLayout from "./layouts/OrgLayout";
// import MemberLayout from "./layouts/MemberLayout";

// // Public Pages
// import Home from "./pages/public/Home";
// import About from "./pages/public/About";
// import Contact from "./pages/public/Contact";
// import Pricing from "./pages/public/Pricing";
// import Unauthorized from "./pages/public/Unauthorized";

// // Auth Pages
// import SignIn from "./pages/auth/SignIn"; 
// import OrgSignUp from "./pages/auth/OrgSignUp";
// import MemberSignUp from "./pages/auth/MemberSignUp";

// // Organization Dashboard Pages
// // import OrgHome from "./pages/dashboards/org/OrgHome";
// // import OrgCertificates from "./pages/dashboards/org/OrgCertificates";
// // import OrgMembers from "./pages/dashboards/org/OrgMembers";
// // import OrgTemplates from "./pages/dashboards/org/OrgTemplates";
// // import OrgAnalytics from "./pages/dashboards/org/OrgAnalytics";
// // import OrgSettings from "./pages/dashboards/org/OrgSettings";

// // Member Dashboard Pages
// import MemberHome from "./pages/dashboards/member/MemberHome";
// import MemberProfile from "./pages/dashboards/member/Profile.jsx";
// import MyCertificates from "./pages/dashboards/member/MyCertificates";
// import VerifyCertificate from "./pages/dashboards/member/VerifyCertificate";
// // import Achievements from "./pages/dashboards/member/Achievements";
// import Settings from "./pages/dashboards/member/Settings";

// // Protected Route
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       {/* Public Layout Routes */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
        
//         {/* Auth Routes */}
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/org/signup" element={<OrgSignUp />} />
//         <Route path="/signup" element={<MemberSignUp />} />
//       </Route>

//       {/* Organization Dashboard Routes */}
//       <Route 
//         path="/org/*" 
//         element={
//           <ProtectedRoute allowedRoles={["orgAdmin", "superAdmin", "issuer"]}>
//             <OrgLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* <Route index element={<OrgHome />} />
//         <Route path="dashboard" element={<OrgHome />} />
//         <Route path="certificates" element={<OrgCertificates />} />
//         <Route path="members" element={<OrgMembers />} />
//         <Route path="templates" element={<OrgTemplates />} />
//         <Route path="analytics" element={<OrgAnalytics />} />
//         <Route path="settings" element={<OrgSettings />} />
//         <Route path="profile" element={<OrgSettings />} /> */}
//       </Route>

//       {/* Member Dashboard Routes */}
//       <Route 
//         path="/member/*" 
//         element={
//           <ProtectedRoute allowedRoles={["member"]}>
//             <MemberLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<MemberHome />} />
//         <Route path="dashboard" element={<MemberHome />} />
//         <Route path="my-certificates" element={<MyCertificates />} />
//         <Route path="verify" element={<VerifyCertificate />} />
//         <Route path="profile" element={<MemberProfile />} />
//         {/* <Route path="achievements" element={<Achievements />} /> */}
//         <Route path="settings" element={<Settings />} />
//       </Route>

//       {/* Catch All Route - 404 */}
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// // 404 Not Found Component
// function NotFoundPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
//       <div className="text-center max-w-md">
//         <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//           <span className="text-2xl">🔍</span>
//         </div>
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
//         <p className="text-lg text-gray-600 mb-8">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
//         <div className="space-y-3">
//           <a 
//             href="/" 
//             className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
//           >
//             Go Home
//           </a>
//           <button 
//             onClick={() => window.history.back()} 
//             className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;















import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import OrgLayout from "./layouts/OrgLayout";
import MemberLayout from "./layouts/MemberLayout";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Pricing from "./pages/public/Pricing";
import Unauthorized from "./pages/public/Unauthorized";

// Auth Pages
import SignIn from "./pages/auth/SignIn"; 
import OrgSignUp from "./pages/auth/OrgSignUp";
import MemberSignUp from "./pages/auth/MemberSignUp";

// Organization Dashboard Pages
import OrgHome from "./pages/dashboards/org/OrgHome";
import OrgIssueCertificate from "./pages/dashboards/org/OrgIssueCertificate";
import AddStudent from "./pages/dashboards/org/AddStudent.jsx";

// Member Dashboard Pages
import MemberHome from "./pages/dashboards/member/MemberHome";
import MemberProfile from "./pages/dashboards/member/Profile.jsx";
import MyCertificates from "./pages/dashboards/member/MyCertificates";
import VerifyCertificate from "./pages/dashboards/member/VerifyCertificate";
import Settings from "./pages/dashboards/member/Settings";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/org/signup" element={<OrgSignUp />} />
        <Route path="/signup" element={<MemberSignUp />} />
      </Route>

      {/* Organization Dashboard Routes - PROPERLY NESTED */}
      <Route 
        path="/org" 
        element={
          <ProtectedRoute allowedRoles={["orgAdmin", "superAdmin", "issuer"]}>
            <OrgLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ Yeh sab routes /org ke under honge */}
        <Route index element={<OrgHome />} />
        <Route path="dashboard" element={<OrgHome />} />
        <Route path="issue" element={<OrgIssueCertificate />} />
        <Route path="add-student" element={<AddStudent />} />
      </Route>

      {/* Member Dashboard Routes */}
      <Route 
        path="/member" 
        element={
          <ProtectedRoute allowedRoles={["member"]}>
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MemberHome />} />
        <Route path="dashboard" element={<MemberHome />} />
        <Route path="my-certificates" element={<MyCertificates />} />
        <Route path="verify" element={<VerifyCertificate />} />
        <Route path="profile" element={<MemberProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch All Route - 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// 404 Not Found Component
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🔍</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <a 
            href="/" 
            className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Go Home
          </a>
          <button 
            onClick={() => window.history.back()} 
            className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;