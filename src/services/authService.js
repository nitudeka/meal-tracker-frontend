import { apiUtils } from '../lib/api';
import { API_ENDPOINTS } from '../constants/api';
import { ACCESS_TOKEN_KEY } from '../constants/common';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await apiUtils.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Store tokens if provided
    if (response.access_token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refresh-token', response.refresh_token);
    }
    
    return response;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiUtils.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });
    
    if (response.access_token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
    }
    
    return response;
  },

  // Clear authentication data
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem('refresh-token');
  },
};