import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  // ✅ Updated routes according to backend
  register: async (data) => axiosInstance.post("/organizations/register", data),
  login: async (data) => axiosInstance.post("/organizations/login", data),
  refreshToken: async () => axiosInstance.post("/organizations/refresh-token"),
  logout: async () => axiosInstance.post("/organizations/logout"),
  assignRole: async (data) => axiosInstance.post("/organizations/assign-role", data),
  
  // ✅ NEW: Get organization profile
  getProfile: async () => axiosInstance.get("/organizations/profile"),
};

export default organizationService;

/* Additional functionalities to be implemented in the future:  

-> update organization details
-> get organization details
-> list all organizations
-> delete organization
-> update organization password
-> reset organization password
-> get organization by id
-> get organization by name
-> get organization by email
-> get organization by domain
-> get organization by role

*/