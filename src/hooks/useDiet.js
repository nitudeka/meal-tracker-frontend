import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dietService } from "@/services/dietService";

// Query keys
export const dietKeys = {
  all: ["diet"],
  ingredients: (dishName) => [...dietKeys.all, "ingredients", dishName],
  lists: () => [...dietKeys.all, "list"],
  list: (filters) => [...dietKeys.lists(), { filters }],
};

// Hook to fetch ingredients for a dish
export const useIngredients = () => {
  return useMutation({
    mutationFn: (dishName) => dietService.getIngredients(dishName),
    onError: (error) => {
      console.error("Failed to fetch ingredients:", error);
    },
  });
};

// Hook to get nutrients for ingredients
export const useNutrients = () => {
  return useMutation({
    mutationFn: (ingredients) => dietService.getNutrients(ingredients),
    onError: (error) => {
      console.error("Failed to fetch nutrients:", error);
    },
  });
};

// Hook to get daily nutrition trends
export const useDailyNutrition = (date) => {
  return useQuery({
    queryKey: [...dietKeys.all, "daily-nutrition", date],
    queryFn: () => dietService.getDailyNutrition(date),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Hook to get meals history
export const useMealsHistory = () => {
  return useQuery({
    queryKey: [...dietKeys.all, "history"],
    queryFn: () => dietService.getMealsHistory(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Hook to get weekly nutrition data
export const useWeeklyNutrition = () => {
  return useQuery({
    queryKey: [...dietKeys.all, "weekly-nutrition"],
    queryFn: () => dietService.getWeeklyNutrition(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Hook to save a diet entry
export const useSaveDietEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dietData) => dietService.saveDietEntry(dietData),
    onSuccess: () => {
      // Invalidate and refetch diet entries
      queryClient.invalidateQueries({ queryKey: dietKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to save diet entry:", error);
    },
  });
};
