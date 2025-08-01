import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { moodService } from "@/services";
import dayjs from "dayjs";

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
    return {
      startDate: dayjs().add(-7, 'days').format("YYYY-MM-DD"),
      endDate: dayjs().add(1, 'day').format("YYYY-MM-DD"),
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
