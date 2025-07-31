import { apiUtils } from "../lib/api";

export const moodService = {
  // Save a new mood entry
  saveMoodEntry: async (moodData) => {
    const { date, entryType, mood } = moodData;
    
    // Format date to YYYY-MM-DD format with 00:00:00 time
    let formattedDate;
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
    } else {
      formattedDate = date;
    }
    
    return await apiUtils.post("/mood", {
      date: formattedDate,
      entryType,
      mood,
    });
  },

  // Get mood entries (for future use)
  getMoodEntries: async (params = {}) => {
    return await apiUtils.get("/mood", { params });
  },
}; 