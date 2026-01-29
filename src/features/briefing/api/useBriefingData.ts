import { useInfiniteQuery } from '@tanstack/react-query';
import type { BriefingDay } from '../../../lib/mock-data';
import type { Slice } from '../../../lib/types';
import { getBriefingSummary } from './getBriefingSummary';

interface UseBriefingDataResult {
    data: BriefingDay[];
    isLoading: boolean;
    error: Error | null;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

export function useBriefingData(): UseBriefingDataResult {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<Slice<BriefingDay>, Error>({
        queryKey: ['briefing', 'summary'],
        queryFn: getBriefingSummary,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.last) return undefined;
            return lastPage.number + 1;
        },
        staleTime: 60000,
    });

    // Flatten pages into a single array of BriefingDay
    const allDays = data?.pages.flatMap((page: Slice<BriefingDay>) => page.content) || [];

    return {
        data: allDays,
        isLoading,
        error: error as Error | null,
        fetchNextPage,
        hasNextPage: !!hasNextPage,
        isFetchingNextPage
    };
}
