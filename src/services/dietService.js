import { apiUtils } from "../lib/api";

export const dietService = {
  // Get ingredients for a specific dish
  getIngredients: async (dishName) => {
    return await apiUtils.get(
      `/meal/ingredients?dish=${encodeURIComponent(dishName)}`,
    );
  },

  // Save diet entry (for future use)
  saveDietEntry: async (dietData) => {
    return await apiUtils.post("/meal", dietData);
  },
};
