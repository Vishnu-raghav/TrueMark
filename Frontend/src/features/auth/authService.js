import axiosInstance from "../../utils/axiosInstance";

const authService = {
  registerUser: async (data) => axiosInstance.post("/auth/register", data),
  loginUser: async (data) => axiosInstance.post("/auth/login", data),
  getCurrentUser: async () => axiosInstance.get("/auth/getCurrentUser"),
  logoutUser: async () => axiosInstance.post("/auth/logout"),
  refreshAccessToken: async () => axiosInstance.post("/auth/refreshToken"),
  
  // ✅ NEW: Profile management
  updateUserProfile: async (data) => axiosInstance.put("/auth/profile", data),
  changePassword: async (data) => axiosInstance.post("/auth/changePassword", data),
};

export default authService;