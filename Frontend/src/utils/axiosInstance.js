import axios from "axios";
import { store } from "../app/store";
import { logout, refreshToken } from "../features/auth/authSlice.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend base URL
  withCredentials: true,
});

// Request Interceptor → add access token
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor → handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshTokenValue}` },
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Redux store me bhi update karna chahiye
        store.dispatch(refreshToken(newAccessToken));

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
