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