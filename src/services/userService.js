import { apiUtils } from '../lib/api';
import { API_ENDPOINTS } from '../constants/api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    return await apiUtils.get(API_ENDPOINTS.USER.PROFILE);
  },
};