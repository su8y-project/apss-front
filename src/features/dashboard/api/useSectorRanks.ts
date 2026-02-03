import { useQuery } from "@tanstack/react-query";
import { getSectorRanks } from "./getSectorRanks";

export const useSectorRanks = () => {
    return useQuery({
        queryKey: ['sectorRanks'],
        queryFn: getSectorRanks,
        // Cache for 5 minutes
        staleTime: 1000 * 60 * 5,
    });
};
