import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  register: async (data) => axiosInstance.post("/organizations/register", data),
  login: async (data) => axiosInstance.post("/organizations/login", data),
  refreshToken: async () => axiosInstance.post("/organizations/refresh-token"),
  logout: async () => axiosInstance.post("/organizations/logout"),
  assignRole: async (data) => axiosInstance.post("/organizations/assign-role", data),
  
  // ✅ Profile endpoint
  getProfile: async () => axiosInstance.get("/organizations/profile"),
  
  // ✅ NEW: Students management endpoints
  getStudents: async () => axiosInstance.get("/org/students"),
  searchStudents: async (query) => axiosInstance.get(`/org/students/search?query=${query}`),
  getStudentsCount: async () => axiosInstance.get("/org/students/count"),
};

export default organizationService;