import { ArrowDown, ArrowUp, Zap } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { cn } from "../../lib/utils";
import type { StockData } from "../../lib/mock-data";

interface StockCardProps {
    data: StockData;
    rank?: number;
}

export function StockCard({ data, rank }: StockCardProps) {
    const isPositive = data.change >= 0;

    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-slate-900/60">
            {/* Glow Effect for High Score */}
            {data.aiScore >= 90 && (
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl transition-all group-hover:bg-indigo-500/20"></div>
            )}

            <div className="flex items-start justify-between gap-3">
                {/* Rank Indicator */}
                {rank && (
                    <div className="flex-shrink-0 flex flex-col items-center justify-center pt-1">
                        <span className="text-xl font-bold text-slate-500 font-mono leading-none">
                            {rank.toString().padStart(2, '0')}
                        </span>
                    </div>
                )}

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-100">{data.symbol}</h3>
                        <span className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase text-slate-500">{data.name}</span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono tracking-tight text-white">${data.price.toFixed(2)}</span>
                        <div className={cn("flex items-center text-xs font-semibold font-mono", isPositive ? "text-emerald-400" : "text-red-400")}>
                            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                            {Math.abs(data.change).toFixed(2)} ({data.changePercent.toFixed(2)}%)
                        </div>
                    </div>
                </div>

                {/* AI Score Badge */}
                <div className="flex flex-col items-end">
                    <div className={cn(
                        "flex items-center gap-1.5 rounded-lg px-2 py-1 ring-1",
                        data.aiScore >= 80 ? "bg-indigo-500/10 text-indigo-400 ring-indigo-500/30" :
                            data.aiScore >= 50 ? "bg-amber-500/10 text-amber-400 ring-amber-500/30" :
                                "bg-slate-800/50 text-slate-400 ring-white/5"
                    )}>
                        <Zap className="h-3.5 w-3.5 fill-current" />
                        <span className="text-sm font-bold">{data.aiScore}</span>
                    </div>
                    <span className="mt-1 text-[10px] font-medium uppercase text-slate-600">AI Score</span>
                </div>
            </div>

            {/* Sparkline & Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="h-12 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.history}>
                            <defs>
                                <linearGradient id={`gradient-${data.symbol}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <YAxis domain={['dataMin', 'dataMax']} hide />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? "#10b981" : "#ef4444"}
                                strokeWidth={2}
                                fill={`url(#gradient-${data.symbol})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col justify-between">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Momentum</span>
                        <span className="font-mono text-slate-300">{data.factors.momentum}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Vol</span>
                        <span className="font-mono text-slate-300">{data.factors.volatility}</span>
                    </div>


                </div>
            </div>
        </div>
    );
}
