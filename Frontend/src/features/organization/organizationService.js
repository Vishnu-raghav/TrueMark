import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  // ✅ Organization authentication endpoints
  register: async (data) => axiosInstance.post("/organizations/register", data),
  login: async (data) => axiosInstance.post("/organizations/login", data),
  refreshToken: async () => axiosInstance.post("/organizations/refresh-token"),
  logout: async () => axiosInstance.post("/organizations/logout"),
  assignRole: async (data) => axiosInstance.post("/organizations/assign-role", data),
  
  // ✅ Organization profile endpoint
  getProfile: async () => axiosInstance.get("/organizations/profile"),
  
  // ✅ CORRECTED: Students management endpoints - now matching backend routes
  getStudents: async () => axiosInstance.get("/org"), // ✅ CHANGED: Matches router.get('/')
  searchStudents: async (query) => axiosInstance.get(`/org/search?query=${query}`), // ✅ CHANGED: Matches router.get('/search')
  getStudentsCount: async () => axiosInstance.get("/org/count"), // ✅ CHANGED: Matches router.get('/count')
};

export default organizationService;