import { Filter, RefreshCcw, Layers, BarChart3, Loader2, AlertCircle } from "lucide-react";
import { MOCK_RANK_DATA, enrichRankData } from "../../lib/mock-data";
import { StockCard } from "./StockCard";
import { cn } from "../../lib/utils";
import { useSearchParams } from "react-router-dom";
import { useSectorRanks } from "./api/useSectorRanks";
import { toast } from "sonner";

export function ScoreBoard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: sectorData, isLoading: isSectorLoading, error: sectorError, refetch: refetchSectors } = useSectorRanks();

    // URL State Parsers
    const viewMode = (searchParams.get('view') as 'STOCK' | 'SECTOR') || 'SECTOR';
    const filterMinScore = Number(searchParams.get('minScore')) || 0;

    // State Setters
    const setViewMode = (mode: 'STOCK' | 'SECTOR') => {
        setSearchParams(prev => {
            prev.set('view', mode);
            return prev;
        });
    };

    const setFilterMinScore = (score: number) => {
        setSearchParams(prev => {
            if (score === 0) {
                prev.delete('minScore');
            } else {
                prev.set('minScore', score.toString());
            }
            return prev;
        });
    };


    // Transform API Rank Data to UI Stock Data
    const stocks = MOCK_RANK_DATA.data.ranks
        .map(enrichRankData)
        .filter(stock => stock.aiScore >= filterMinScore);

    // Adjust filter logic for new data range (Real data is approx -10 to +5)
    // If filter is active (originally 80), we now treat it as "Positive Only" (> 0)
    const effectiveMinScore = filterMinScore > 0 ? 0 : -100;

    const sectors = (sectorData?.content || [])
        .filter(sector => sector.finalScore >= effectiveMinScore);

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Header Area */}
            <div className="flex flex-col gap-3 px-1 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className={cn(
                                    "absolute inline-flex h-full w-full rounded-full opacity-75",
                                    viewMode === 'SECTOR' && isSectorLoading ? "animate-ping bg-amber-400" : "animate-ping bg-indigo-400"
                                )}></span>
                                <span className={cn(
                                    "relative inline-flex h-2 w-2 rounded-full",
                                    viewMode === 'SECTOR' && isSectorLoading ? "bg-amber-500" : "bg-indigo-500"
                                )}></span>
                            </span>
                            AI Core Rank
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterMinScore(filterMinScore > 0 ? 0 : 80)} // Toggle logic
                            className={cn(
                                "flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors border",
                                filterMinScore > 0
                                    ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                    : "bg-slate-800/50 text-slate-400 border-transparent hover:text-white"
                            )}
                        >
                            <Filter className="h-3 w-3" />
                            {filterMinScore > 0 ? "Positive Only" : "All Sectors"}
                        </button>
                        <button
                            onClick={() => viewMode === 'SECTOR' ? refetchSectors() : window.location.reload()}
                            className="p-1 rounded bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
                        >
                            <RefreshCcw className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-900/50 rounded-lg border border-white/5 gap-1">
                    <button
                        onClick={() => setViewMode('SECTOR')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all",
                            viewMode === 'SECTOR'
                                ? "bg-slate-800 text-slate-200 shadow-sm ring-1 ring-white/10"
                                : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <BarChart3 className="h-3.5 w-3.5" />
                        Sector Rank
                    </button>
                    <button
                        onClick={() => toast.info("Stock Rank 서비스는 준비중입니다.")}
                        className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all text-slate-600 cursor-not-allowed bg-slate-900/50"
                    >
                        <Layers className="h-3.5 w-3.5" />
                        Stock Rank
                        <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-500">
                            Coming Soon
                        </span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto pr-2 custom-scrollbar pb-4 min-h-0">
                {viewMode === 'STOCK' ? (
                    <div className="grid grid-cols-1 gap-3">
                        {stocks.map((stock, index) => (
                            <StockCard key={stock.symbol} data={stock} rank={index + 1} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {isSectorLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                                <p className="text-xs text-slate-500">Updating Analysis...</p>
                            </div>
                        ) : sectorError ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-2">
                                <div className="p-2 rounded-full bg-red-500/10">
                                    <AlertCircle className="h-6 w-6 text-red-400" />
                                </div>
                                <p className="text-xs text-slate-500">Failed to load sector data</p>
                                <button
                                    onClick={() => refetchSectors()}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            sectors.map((sector) => (
                                <div key={sector.sectorCode} className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm transition-all hover:bg-slate-900/60 flex items-center justify-between">
                                    {/* Background Gradient Bar */}
                                    <div
                                        className={cn(
                                            "absolute left-0 top-0 bottom-0 transition-all opacity-10",
                                            sector.finalScore >= 0 ? "bg-gradient-to-r from-indigo-500 to-transparent" : "bg-gradient-to-r from-red-500 to-transparent"
                                        )}
                                        style={{ width: `${Math.min(Math.abs(sector.finalScore) * 10, 100)}%` }}
                                    ></div>

                                    <div className="relative z-10 flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-lg font-bold text-sm",
                                            sector.finalScore >= 3.0 ? "bg-indigo-500/20 text-indigo-400" :
                                                sector.finalScore >= 0 ? "bg-slate-800 text-slate-400" :
                                                    "bg-red-500/10 text-red-400"
                                        )}>
                                            {sector.finalScore.toFixed(1)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-200">{sector.name}</h3>
                                            <p className="text-[10px] text-slate-500 font-mono">{sector.sectorCode}</p>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className={cn(
                                            "rounded px-2 py-1 text-[10px] font-bold uppercase ring-1",
                                            sector.finalScore >= 3.0 ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" :
                                                sector.finalScore >= 0 ? "bg-slate-800/50 text-slate-400 ring-slate-700" :
                                                    "bg-red-500/10 text-red-400 ring-red-500/20"
                                        )}>
                                            {sector.finalScore >= 3.0 ? "Overweight" : sector.finalScore >= 0 ? "Neutral" : "Underweight"}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
