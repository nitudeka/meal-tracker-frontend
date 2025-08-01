import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { moodService } from "@/services";

// Query keys
export const moodKeys = {
  all: ["mood"],
  lists: () => [...moodKeys.all, "list"],
  list: (filters) => [...moodKeys.lists(), { filters }],
};

// Hook to fetch mood entries
export const useMoodEntries = (filters = {}) => {
  // Calculate one week date range from current date
  const getDateRange = () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999); // End of today

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6); // 7 days ago (including today)
    startDate.setHours(0, 0, 0, 0); // Start of day

    return {
      startDate: startDate.toISOString().split("T")[0], // YYYY-MM-DD format
      endDate: endDate.toISOString().split("T")[0], // YYYY-MM-DD format
    };
  };

  const dateRange = getDateRange();
  const queryParams = { ...dateRange, ...filters };

  return useQuery({
    queryKey: moodKeys.list(queryParams),
    queryFn: () => moodService.getMoodEntries(queryParams),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to save a new mood entry
export const useSaveMoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moodData) => moodService.saveMoodEntry(moodData),
    onSuccess: () => {
      // Invalidate and refetch mood entries
      queryClient.invalidateQueries({ queryKey: moodKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to save mood entry:", error);
    },
  });
};
