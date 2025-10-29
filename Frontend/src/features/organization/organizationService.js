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
  
  // ✅ UPDATED: Students management endpoints - now matching consolidated backend routes
  getStudents: async () => axiosInstance.get("/organizations/students"),
  searchStudents: async (query) => axiosInstance.get(`/organizations/students/search?query=${query}`),
  getStudentsCount: async () => axiosInstance.get("/organizations/students/count"),
   // ✅ ADD STUDENT ENDPOINT
  addStudent: async (studentEmail) => 
    axiosInstance.post("/organizations/add-student", { studentEmail }),
  
  // ✅ FIX STUDENTS ENDPOINT (Optional)
  fixStudents: async () => 
    axiosInstance.post("/organizations/fix-students"),
};

export default organizationService;