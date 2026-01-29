import { BriefingHeader } from "./components/BriefingHeader";
import { useBriefingData } from "./api/useBriefingData";
import { AlertCircle } from "lucide-react";
import { MarketIssuesSection } from "./components/MarketIssuesSection";
import { MacroSection } from "./components/MacroSection";
import { KoreaImpactSection } from "./components/KoreaImpactSection";
import { useSearchParams } from "react-router-dom";

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

    // Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-1 h-full animate-pulse">
                <div className="h-24 rounded-xl bg-slate-800/50" />
                <div className="flex-1 rounded-xl bg-slate-800/30" />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="rounded-full bg-red-500/10 p-3">
                    <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-200">데이터를 불러올 수 없습니다</h3>
                    <p className="mt-1 text-xs text-slate-500">{error.message}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    // Empty State
    if (briefingData.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-6 text-center">
                <p className="text-sm text-slate-500">등록된 브리핑 데이터가 없습니다.</p>
            </div>
        );
    }

    const selectedDayData = briefingData.find(d => d.date === selectedDate) || briefingData[0];

    return (
        <div className="flex flex-col gap-4 p-1 h-full">
            <BriefingHeader
                data={{ status: "success", data: briefingData }}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
            />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6 pb-4">
                <MarketIssuesSection
                    date={selectedDate}
                    issues={selectedDayData.issues}
                />
            </div>
        </div>
    );
}
