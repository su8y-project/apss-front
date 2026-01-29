import { MOCK_STOCKS } from "../../lib/mock-data";
import { StockCard } from "./StockCard";
import { Filter } from "lucide-react";

export function ScoreBoard() {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Live Signals
                </h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 rounded bg-slate-800/50 px-2 py-1 text-[10px] font-medium text-slate-400 hover:text-white transition-colors">
                        <Filter className="h-3 w-3" />
                        Filter: AI Score {'>'} 80
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 overflow-y-auto pr-2 custom-scrollbar pb-4">
                {MOCK_STOCKS.map((stock) => (
                    <StockCard key={stock.symbol} data={stock} />
                ))}
            </div>
        </div>
    );
}
