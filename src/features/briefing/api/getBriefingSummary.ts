import type { BriefingResponse, BriefingDay } from '../../../lib/mock-data';

export const getBriefingSummary = async (): Promise<BriefingDay[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/issues/summary');

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result: BriefingResponse = await response.json();

        if (result.status === 'success' && Array.isArray(result.data)) {
            // Log success
            console.log(JSON.stringify({
                level: 'info',
                event: 'fetch_briefing_success',
                count: result.data.length,
                timestamp: new Date().toISOString()
            }));
            return result.data;
        } else {
            throw new Error("Invalid API response format");
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
