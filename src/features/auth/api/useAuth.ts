import { useQuery } from "@tanstack/react-query";
import { getMe } from "./getMe";

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: getMe,
        retry: false, // Do not retry if 401/403
        staleTime: 1000 * 60 * 30, // 30 mins
    });
};
