import { apiUtils } from "../lib/api";

export const dietService = {
  // Get ingredients for a specific dish
  getIngredients: async (dishName) => {
    return await apiUtils.get(
      `/meal/ingredients?dish=${encodeURIComponent(dishName)}`,
    );
  },

  // Get nutrients for ingredients
  getNutrients: async (ingredients) => {
    return await apiUtils.post("/meal/nutrients", { ingredients });
  },

  // Get daily nutrition trends
  getDailyNutrition: async (date) => {
    return await apiUtils.get(`/meal/daily-nutrition?date=${date}`);
  },

  // Get meals history
  getMealsHistory: async () => {
    return await apiUtils.get("/meal/history");
  },

  // Save diet entry (for future use)
  saveDietEntry: async (dietData) => {
    return await apiUtils.post("/meal", dietData);
  },
};
