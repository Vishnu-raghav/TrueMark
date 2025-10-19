import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function OrgProtectedRoute() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) return <Navigate to="/signin" replace />;

  const allowedRoles = ["orgAdmin", "superAdmin", "issuer"];
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
