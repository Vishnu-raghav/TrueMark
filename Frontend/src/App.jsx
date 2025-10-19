import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import OrgLayout from "./layouts/OrgLayout";
import MemberLayout from "./layouts/MemberLayout";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Unauthorized from "./pages/public/Unauthorized";

// Dashboard Pages
import OrgHome from "./pages/dashboards/org/OrgHome";
import OrgSettings from "./pages/dashboards/org/OrgSettings";
import MemberHome from "./pages/dashboards/member/MemberHome";
import MemberProfile from "./pages/dashboards/member/MemberProfile";

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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Organization Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={["orgAdmin","superAdmin","issuer"]} />}>
        <Route element={<OrgLayout />}>
          <Route path="/org" element={<OrgHome />} />
          <Route path="/org/settings" element={<OrgSettings />} />
        </Route>
      </Route>

      {/* Member Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
        <Route element={<MemberLayout />}>
          <Route path="/member" element={<MemberHome />} />
          <Route path="/member/profile" element={<MemberProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
