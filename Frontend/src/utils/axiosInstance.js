import axios from "axios";

// Create base axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // cookies automatically sent
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor → token refresh logic
// But we won't dispatch directly from here to avoid circular dependency
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Cannot call store.dispatch here to logout
        console.error("Token refresh failed:", err);
        // Return a special error so thunk can handle logout
        err.isAuthError = true;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
