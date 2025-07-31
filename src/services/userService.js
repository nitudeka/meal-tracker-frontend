import { apiUtils } from "../lib/api";

export const userService = {
  // Get user profile
  getProfile: async () => {
    return await apiUtils.get("/auth/profile");
  },
};
