import { Filter, RefreshCcw } from "lucide-react";
import { MOCK_RANK_DATA, enrichRankData } from "../../lib/mock-data";
import { StockCard } from "./StockCard";
import { useState } from "react";

export function ScoreBoard() {
    const [filterMinScore, setFilterMinScore] = useState(0);

    // Transform API Rank Data to UI Stock Data
    // In a real app, this might involve a secondary fetch for prices, 
    // or the rank API might return current price. 
    // Here we use the enrichment helper.
    const stocks = MOCK_RANK_DATA.data.ranks
        .map(enrichRankData)
        .filter(stock => stock.aiScore >= filterMinScore);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                        </span>
                        Live Core Rank
                    </h2>
                    <span className="text-[10px] text-slate-600 bg-slate-900/50 px-2 py-0.5 rounded border border-white/5">
                        /api/stock/rank
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterMinScore(prev => prev === 80 ? 0 : 80)}
                        className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors border ${filterMinScore === 80
                                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                : "bg-slate-800/50 text-slate-400 border-transparent hover:text-white"
                            }`}
                    >
                        <Filter className="h-3 w-3" />
                        Score {'>'} 80
                    </button>
                    <button className="p-1 rounded bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                        <RefreshCcw className="h-3 w-3" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 overflow-y-auto pr-2 custom-scrollbar pb-4 min-h-0">
                {stocks.map((stock) => (
                    <StockCard key={stock.symbol} data={stock} />
                ))}
            </div>
        </div>
    );
}
