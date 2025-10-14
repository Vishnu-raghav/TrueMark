import axiosInstance from "../../utils/axiosInstance";

const authService = {
  registerUser: async (data) => axiosInstance.post("/auth/register", data),
  loginUser: async (data) => axiosInstance.post("/auth/login", data),
  getCurrentUser: async () => axiosInstance.get("/auth/getCurrentUser"),
  logoutUser: async () => axiosInstance.post("/auth/logout"),
  refreshAccessToken: async () => axiosInstance.post("/auth/refreshToken"),
};

export default authService;
/* Additional functionalities to be implemented in the future:

-> update user details  
-> get user details
-> list all users
-> delete user
-> update user password
-> reset user password
-> get user by id
-> get user by name
-> get user by email
-> get user by role 
*/