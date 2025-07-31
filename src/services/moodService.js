import { apiUtils } from "../lib/api";

export const moodService = {
  // Save a new mood entry
  saveMoodEntry: async (moodData) => {
    const { date, entryType, mood } = moodData;
    
    return await apiUtils.post("/mood", {
      date,
      entryType,
      mood,
    });
  },

  // Get mood entries (for future use)
  getMoodEntries: async (params = {}) => {
    return await apiUtils.get("/mood", { params });
  },
}; 