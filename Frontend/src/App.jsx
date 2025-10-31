import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // ✅ Navigate import karo
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import OrgStudents from "./pages/dashboards/org/OrgStudents.jsx";
import OrgProfile from "./pages/dashboards/org/OrgProfile.jsx";

// Member Dashboard Pages
import MemberHome from "./pages/dashboards/member/MemberHome";
import MemberProfile from "./pages/dashboards/member/Profile.jsx";
import MyCertificates from "./pages/dashboards/member/MyCertificates";
import VerifyCertificate from "./pages/dashboards/member/VerifyCertificate";
import Settings from "./pages/dashboards/member/Settings";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Redux Actions
import { getCurrentUser } from "./features/auth/authslice";
import { getOrganizationProfile } from "./features/organization/organizationSlice";

function App() {
  const dispatch = useDispatch();
  const { user, accessToken, isLoading } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);

  
  const checkAuthStatus = useCallback(async () => {
    const userFromStorage = localStorage.getItem('user');
    const tokenFromStorage = localStorage.getItem('accessToken');
    
    
    if ((userFromStorage && tokenFromStorage) && !user) {
      try {
        // Validate token by fetching current user
        await dispatch(getCurrentUser()).unwrap();
        
        // If user is organization, fetch org profile
        const userData = JSON.parse(userFromStorage);
        if (userData.role === 'orgAdmin' || userData.role === 'superAdmin' || userData.role === 'issuer') {
          await dispatch(getOrganizationProfile()).unwrap();
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
  }, [dispatch, user]);


  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Auth Routes - Redirect if already authenticated */}
        <Route 
          path="/signin" 
          element={
            <PublicOnlyRoute user={user}>
              <SignIn />
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/org/signup" 
          element={
            <PublicOnlyRoute user={user}>
              <OrgSignUp />
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicOnlyRoute user={user}>
              <MemberSignUp />
            </PublicOnlyRoute>
          } 
        />
      </Route>

      {/* Organization Dashboard Routes */}
      <Route 
        path="/org" 
        element={
          <ProtectedRoute 
            user={user} 
            allowedRoles={["orgAdmin", "superAdmin", "issuer"]}
            fallbackPath="/unauthorized"
          >
            <OrgLayout organization={organization} />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrgHome />} />
        <Route path="dashboard" element={<OrgHome />} />
        <Route path="issue" element={<OrgIssueCertificate />} />
        <Route path="add-student" element={<AddStudent />} />
        <Route path="students" element={<OrgStudents />} />
        <Route path="profile" element={<OrgProfile />} />
      </Route>

      {/* Member Dashboard Routes */}
      <Route 
        path="/member" 
        element={
          <ProtectedRoute 
            user={user} 
            allowedRoles={["member"]}
            fallbackPath="/unauthorized"
          >
            <MemberLayout user={user} />
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


const PublicOnlyRoute = ({ user, children }) => {
  const location = useLocation();
  
  if (user) {
    const redirectPath = user.role === 'member' ? '/member/dashboard' : '/org/dashboard';
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }
  
  return children;
};

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