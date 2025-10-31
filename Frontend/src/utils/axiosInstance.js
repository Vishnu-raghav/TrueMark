import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → FIXED: Don't refresh token for organization login
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // FIXED: Don't attempt token refresh for organization routes or login failures
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url.includes('/auth/login') &&
        !originalRequest.url.includes('/organizations/login') && 
        !originalRequest.url.includes('/auth/register') &&
        !originalRequest.url.includes('/organizations/register')
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/auth/refreshToken`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        
        // Clear auth data on refresh failure
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('organization');
        
        // Redirect to login only if not already there
        if (!window.location.pathname.includes('/signin')) {
          window.location.href = '/signin';
        }
        
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;