// Export all services
export { authService } from "./authService";
export { userService } from "./userService";
export { moodService } from "./moodService";
export { dietService } from "./dietService";

// Export API utilities for direct use
export { apiUtils, handleApiError } from "../lib/api";
export { default as api } from "../lib/api";

// Export constants
export { API_ENDPOINTS, API_BASE_URL, HTTP_STATUS } from "../constants/api";
