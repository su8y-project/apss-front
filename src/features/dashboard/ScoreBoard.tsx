import { Filter, RefreshCcw, Layers, BarChart3 } from "lucide-react";
import { MOCK_RANK_DATA, MOCK_SECTOR_RANK_DATA, enrichRankData } from "../../lib/mock-data";
import { StockCard } from "./StockCard";
import { useState } from "react";
import { cn } from "../../lib/utils";

export function ScoreBoard() {
    const [viewMode, setViewMode] = useState<'STOCK' | 'SECTOR'>('STOCK');
    const [filterMinScore, setFilterMinScore] = useState(0);

    // Transform API Rank Data to UI Stock Data
    const stocks = MOCK_RANK_DATA.data.ranks
        .map(enrichRankData)
        .filter(stock => stock.aiScore >= filterMinScore);

    const sectors = MOCK_SECTOR_RANK_DATA.data.ranks
        .filter(sector => sector.finalScore >= filterMinScore);

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Header Area */}
            <div className="flex flex-col gap-3 px-1 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                            </span>
                            AI Core Rank
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterMinScore(prev => prev === 80 ? 0 : 80)}
                            className={cn(
                                "flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors border",
                                filterMinScore === 80
                                    ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                    : "bg-slate-800/50 text-slate-400 border-transparent hover:text-white"
                            )}
                        >
                            <Filter className="h-3 w-3" />
                            Score {'>'} 80
                        </button>
                        <button className="p-1 rounded bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                            <RefreshCcw className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-900/50 rounded-lg border border-white/5 gap-1">
                    <button
                        onClick={() => setViewMode('STOCK')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all",
                            viewMode === 'STOCK'
                                ? "bg-slate-800 text-slate-200 shadow-sm ring-1 ring-white/10"
                                : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <Layers className="h-3.5 w-3.5" />
                        Stock Rank
                    </button>
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
                        {sectors.map((sector) => (
                            <div key={sector.sectorCode} className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm transition-all hover:bg-slate-900/60 flex items-center justify-between">
                                {/* Background Gradient Bar */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500/10 to-transparent transition-all"
                                    style={{ width: `${sector.finalScore}%` }}
                                ></div>

                                <div className="relative z-10 flex items-center gap-3">
                                    <div className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-lg font-bold text-sm",
                                        sector.finalScore >= 80 ? "bg-indigo-500/20 text-indigo-400" :
                                            sector.finalScore >= 50 ? "bg-slate-800 text-slate-400" :
                                                "bg-red-500/10 text-red-400"
                                    )}>
                                        {Math.round(sector.finalScore)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-200">{sector.name}</h3>
                                        <p className="text-[10px] text-slate-500 font-mono">{sector.sectorCode}</p>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className={cn(
                                        "rounded px-2 py-1 text-[10px] font-bold uppercase ring-1",
                                        sector.finalScore >= 80 ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" :
                                            sector.finalScore >= 50 ? "bg-slate-800/50 text-slate-400 ring-slate-700" :
                                                "bg-red-500/10 text-red-400 ring-red-500/20"
                                    )}>
                                        {sector.finalScore >= 80 ? "Overweight" : sector.finalScore >= 40 ? "Neutral" : "Underweight"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
