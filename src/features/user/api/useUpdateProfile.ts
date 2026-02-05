import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "./updateProfile";
import type { CreateProfileDTO } from "../types";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProfileDTO) => updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        },
    });
};
