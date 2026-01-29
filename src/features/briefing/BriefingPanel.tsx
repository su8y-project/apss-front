import { BookOpen, FileText, Globe, TrendingUp } from "lucide-react";
import { BRIEFING_DATA } from "../../lib/mock-data";
import { cn } from "../../lib/utils";

export function BriefingPanel() {
    return (
        <div className="flex flex-col gap-6 p-1">
            <header className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-100">Morning Briefing</h2>
                        <p className="text-xs text-slate-500">AI Analysis • Wednesday, Oct 24</p>
                    </div>
                </div>
                <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] uppercase font-bold text-indigo-400 ring-1 ring-indigo-500/20 animate-pulse">
                    Live Updates
                </div>
            </header>

            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 h-[calc(100vh-14rem)]">
                {/* 1. US Market Overview */}
                <section>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <Globe className="h-4 w-4 text-sky-400" />
                        US Market Overview
                    </h3>
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm">
                        <p className="mb-4 text-sm leading-relaxed text-slate-400">
                            {BRIEFING_DATA.usMarket.summary}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {BRIEFING_DATA.usMarket.indices.map((idx) => (
                                <div key={idx.name} className="flex flex-col rounded-lg bg-slate-800/50 p-2 text-center ring-1 ring-white/5">
                                    <span className="text-[10px] uppercase text-slate-500">{idx.name}</span>
                                    <span className="font-mono text-sm font-bold text-slate-200">{idx.value.toLocaleString()}</span>
                                    <span className={cn("text-[10px] font-bold", idx.change >= 0 ? "text-emerald-400" : "text-red-400")}>
                                        {idx.change >= 0 ? "+" : ""}{idx.change}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Macro & Finance */}
                <section>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <TrendingUp className="h-4 w-4 text-amber-400" />
                        Macro & Finance
                    </h3>
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm">
                        <p className="mb-4 text-sm leading-relaxed text-slate-400">
                            {BRIEFING_DATA.macro.summary}
                        </p>
                        <ul className="space-y-2">
                            {BRIEFING_DATA.macro.events.map((event, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    {event}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 3. Korea Impact Analysis */}
                <section>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <FileText className="h-4 w-4 text-emerald-400" />
                        Korea Market Impact
                    </h3>
                    <div className="grid gap-3">
                        {BRIEFING_DATA.koreaImpact.map((item) => (
                            <div key={item.symbol} className="rounded-xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-200">{item.name}</span>
                                        <span className="text-[10px] text-slate-500 font-mono">({item.symbol})</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{item.reason}</p>
                                </div>
                                <div className={cn(
                                    "rounded px-2 py-1 text-[10px] font-bold uppercase ring-1",
                                    item.impact === 'Positive' ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" :
                                        item.impact === 'Negative' ? "bg-red-500/10 text-red-400 ring-red-500/20" :
                                            "bg-slate-500/10 text-slate-400 ring-slate-500/20"
                                )}>
                                    {item.impact}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
