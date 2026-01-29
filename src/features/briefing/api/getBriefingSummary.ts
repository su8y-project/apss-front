import { apiClient } from '../../../lib/api-client';
import type { BriefingDay } from '../../../lib/mock-data';
import type { Slice } from '../../../lib/types';

export const getBriefingSummary = async ({ pageParam = 0 }: { pageParam?: unknown }): Promise<Slice<BriefingDay>> => {
    const page = typeof pageParam === 'number' ? pageParam : 0;
    try {
        const size = 7; // Default page size (one week)
        const result = await apiClient.get<Slice<BriefingDay>>('/issues/summary', {
            params: {
                page,
                size
            }
        });

        // Check if content exists (Spring Slice structure)
        if (result && Array.isArray(result.content)) {
            // Log success
            console.log(JSON.stringify({
                level: 'info',
                event: 'fetch_briefing_success',
                page: pageParam,
                count: result.content.length,
                timestamp: new Date().toISOString()
            }));
            return result;
        } else {
            throw new Error("Invalid API response format: Expected Slice structure");
        }
    } catch (error) {
        // Log error
        console.error(JSON.stringify({
            level: 'error',
            event: 'fetch_briefing_failed',
            error: error instanceof Error ? error.message : 'Unknown Error',
            timestamp: new Date().toISOString()
        }));
        throw error;
    }
};
