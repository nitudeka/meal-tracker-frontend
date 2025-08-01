import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";

// Query keys
export const userKeys = {
  all: ["user"],
  profile: () => [...userKeys.all, "profile"],
};

// Hook to fetch user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => userService.getProfile(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};
