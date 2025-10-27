import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  register: async (data) => axiosInstance.post("/organizations/register", data),
  login: async (data) => axiosInstance.post("/organizations/login", data),
  refreshToken: async () => axiosInstance.post("/organizations/refresh-token"),
  logout: async () => axiosInstance.post("/organizations/logout"),
  assignRole: async (data) => axiosInstance.post("/organizations/assign-role", data),
  
  // ✅ Profile endpoint - ensure backend has this
  getProfile: async () => axiosInstance.get("/organizations/profile"),
};

export default organizationService;