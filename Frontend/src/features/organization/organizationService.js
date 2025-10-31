import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  register: async (data) => axiosInstance.post("/organizations/register", data),
  login: async (data) => axiosInstance.post("/organizations/login", data),
  refreshToken: async () => axiosInstance.post("/organizations/refresh-token"),
  logout: async () => axiosInstance.post("/organizations/logout"),
  assignRole: async (data) => axiosInstance.post("/organizations/assign-role", data),
  
  getProfile: async () => axiosInstance.get("/organizations/profile"),
  
  updateProfile: async (data) => axiosInstance.put("/organizations/profile", data),
  
  getStudents: async () => axiosInstance.get("/organizations/students"),
  searchStudents: async (query) => axiosInstance.get(`/organizations/students/search?query=${query}`),
  getStudentsCount: async () => axiosInstance.get("/organizations/students/count"),
  
  addStudent: async (studentEmail) => 
    axiosInstance.post("/organizations/add-student", { studentEmail }),
  fixStudents: async () => 
    axiosInstance.post("/organizations/fix-students"),
};

export default organizationService;