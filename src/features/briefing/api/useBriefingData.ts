import { useQuery } from '@tanstack/react-query';
import type { BriefingDay } from '../../../lib/mock-data';
import { getBriefingSummary } from './getBriefingSummary';

interface UseBriefingDataResult {
    data: BriefingDay[];
    isLoading: boolean;
    error: Error | null;
}

export function useBriefingData(): UseBriefingDataResult {
    const { data, isLoading, error } = useQuery({
        queryKey: ['briefing', 'summary'],
        queryFn: getBriefingSummary,
        staleTime: 60000, // 1 minute
        retry: 1,
    });

    return {
        data: data || [],
        isLoading,
        error: error as Error | null
    };
}
