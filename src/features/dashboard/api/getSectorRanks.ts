import { apiClient } from "../../../lib/api-client";
import type { SectorRankResponse } from "../../../lib/mock-data";

export const getSectorRanks = async (): Promise<SectorRankResponse> => {
    try {
        return await apiClient.get<SectorRankResponse>('/scores/ranks/tags');
    } catch (error) {
        console.error('Failed to fetch sector ranks:', error);
        throw error;
    }
};
