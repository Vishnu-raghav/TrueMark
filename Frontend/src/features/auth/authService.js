import axiosInstance from "../../utils/axiosInstance";

const authService = {
    loginUser: async (data) => axiosInstance.post("/auth/Login", data),
    getCurrentUser : async () => axiosInstance.get("/auth/current-user"),
    logoutUser : async () => axiosInstance.post("/auth/logout"),
}

export default authService; 