import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerProfile } from "./registerProfile";
import type { CreateProfileDTO } from "../types";

export const useRegisterProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProfileDTO) => registerProfile(data),
        onSuccess: () => {
            // Invalidate the auth/user query so it refetches the new profile
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
        },
    });
};
