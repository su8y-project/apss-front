import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./logout";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();
            window.location.reload();
        },
        onError: () => {
            // Even if server fails, clear client state
            queryClient.clear();
            window.location.reload();
        }
    });
};
