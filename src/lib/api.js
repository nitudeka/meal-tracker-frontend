import axios from "axios";
import { API_BASE_URL, REQUEST_TIMEOUT, HTTP_STATUS } from "../constants/api";
import { ACCESS_TOKEN_KEY } from "../constants/common";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem("refresh-token");
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token } = response.data;
          localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem("refresh-token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// API utility functions
export const apiUtils = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return new Error(data?.error || "Bad request");
      case HTTP_STATUS.UNAUTHORIZED:
        return new Error(data?.error || "Unauthorized access");
      case HTTP_STATUS.FORBIDDEN:
        return new Error(data?.error || "Access forbidden");
      case HTTP_STATUS.NOT_FOUND:
        return new Error(data?.error || "Resource not found");
      case HTTP_STATUS.CONFLICT:
        return new Error(data?.error || "Resource conflict");
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return new Error(data?.error || "Validation error");
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return new Error(data?.error || "Internal server error");
      case HTTP_STATUS.BAD_GATEWAY:
        return new Error(data?.error || "Bad gateway");
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return new Error(data?.error || "Service unavailable");
      default:
        return new Error(data?.error || `HTTP ${status} error`);
    }
  } else if (error.request) {
    // Request was made but no response received
    return new Error("Network error - no response received");
  } else {
    // Something else happened
    return new Error(error.message || "An unexpected error occurred");
  }
};

// Export the axios instance for direct use if needed
export default api;
