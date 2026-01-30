import { BriefingHeader } from "./components/BriefingHeader";
import { useBriefingData } from "./api/useBriefingData";
import { MarketIssuesSection } from "./components/MarketIssuesSection";
import { useSearchParams } from "react-router-dom";
import { ErrorState } from "../../components/ErrorState";
import { Skeleton } from "../../components/Skeleton";

export function BriefingPanel() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: briefingData, isLoading, error } = useBriefingData();

    const dateParam = searchParams.get('date');
    // 데이터가 로드된 후에만 날짜 선택 로직 적용
    const selectedDate = dateParam || (briefingData.length > 0 ? briefingData[0].date : '');

    const setSelectedDate = (date: string) => {
        setSearchParams(prev => {
            prev.set('date', date);
            return prev;
        });
    };

    const selectedDayData = briefingData.find(d => d.date === selectedDate) || briefingData[0];

    const status = isLoading ? 'loading'
        : error ? 'error'
            : briefingData.length === 0 ? 'empty'
                : 'success';

    const renderContent = () => {
        if (status !== 'success') {
            return {
                loading: (
                    <div className="flex flex-col gap-4 h-full">
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-40 w-full rounded-xl" />
                        <Skeleton className="h-40 w-full rounded-xl" />
                    </div>
                ),
                error: (
                    <ErrorState
                        message={error?.message || "Unknown error"}
                        onRetry={() => window.location.reload()}
                    />
                ),
                empty: (
                    <div className="flex h-full items-center justify-center p-6 text-center">
                        <p className="text-sm text-slate-500">등록된 브리핑 데이터가 없습니다.</p>
                    </div>
                )
            }[status];
        }

        return (
            <MarketIssuesSection
                date={selectedDate}
                issues={selectedDayData?.issues || []}
            />
        );
    };

    return (
        <div className="flex flex-col gap-4 p-1 h-full">
            <BriefingHeader
                data={briefingData.length > 0 ? { status: "success", data: briefingData } : undefined}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                isLoading={isLoading}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6 pb-4">
                {renderContent()}
            </div>
        </div>
    );
}
