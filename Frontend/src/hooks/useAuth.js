import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, getCurrentUser } from "../features/auth/authslice.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Auth actions
  const login = (data) => dispatch(loginUser(data));
  const logout = () => dispatch(logoutUser());
  const fetchCurrentUser = () => dispatch(getCurrentUser());

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    isError,
    isSuccess,
    message,
    login,
    logout,
    fetchCurrentUser,
  };
};
