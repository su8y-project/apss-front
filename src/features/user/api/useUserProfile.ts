import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./getProfile";

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: getProfile,
        retry: false,
    });
};
