import axiosInstance from "../../utils/axiosInstance";

const organizationService = {
  register: async (data) => axiosInstance.post("/organization/org-register", data),
  login: async (data) => axiosInstance.post("/organization/org-login", data),
  refreshToken: async () => axiosInstance.post("/organization/refresh-token"),
  logout: async () => axiosInstance.post("/organization/org-logout"),
  assignRole: async (data) => axiosInstance.post("/organization/assign-role", data),
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