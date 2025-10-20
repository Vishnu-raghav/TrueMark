// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute({ allowedRoles = [] }) {
//   const { user, isLoading } = useSelector((state) => state.auth);

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!user) return <Navigate to="/signin" replace />;

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// }





import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}) {
  const { user } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);
  const location = useLocation();

  // Check loading states
  const authLoading = useSelector((state) => state.auth.isLoading);
  const orgLoading = useSelector((state) => state.organization.isLoading);

  // Show loading spinner
  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // Determine current user and role
  let currentUser = null;
  let currentRole = null;

  if (user) {
    currentUser = user;
    currentRole = user.role;
  } else if (organization) {
    currentUser = organization;
    currentRole = organization.role || "orgAdmin";
  }

  // If no user is authenticated, redirect to appropriate signin
  if (!currentUser) {
    let signInPath = "/signin";
    
    // Smart redirect based on allowed roles
    if (allowedRoles.includes("orgAdmin") || allowedRoles.includes("superAdmin") || allowedRoles.includes("issuer")) {
      signInPath = "/org/signin";
    }
    
    return <Navigate to={signInPath} state={{ from: location }} replace />;
  }

  // Check if user role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children or outlet based on usage
  return children ? children : <Outlet />;
}