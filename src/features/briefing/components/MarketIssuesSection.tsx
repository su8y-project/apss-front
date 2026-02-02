import { Globe } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { Issue } from "../../../lib/mock-data";

interface MarketIssuesSectionProps {
    date: string;
    issues: Issue[];
}

export function MarketIssuesSection({ date, issues }: MarketIssuesSectionProps) {
    return (
        <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300 px-2">
                <Globe className="h-4 w-4 text-sky-400" />
                US Market Overview
            </h3>

            {/* Date Context Header for Content */}
            <div className="mb-2 px-2 text-[10px] uppercase text-slate-500">
                Date: <span className="text-slate-300">{date}</span>
            </div>

            <div className="space-y-3">
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        className={cn(
                            "rounded-xl border p-4 backdrop-blur-sm transition-all hover:bg-slate-900/60",
                            issue.weight >= 3 ? "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/30" :
                                "border-white/5 bg-slate-900/40 hover:border-white/10"
                        )}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={cn(
                                        "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                                        issue.weight >= 4 ? "bg-red-500/20 text-red-400" :
                                            issue.weight >= 3 ? "bg-amber-500/20 text-amber-400" :
                                                "bg-slate-500/20 text-slate-400"
                                    )}>
                                        Score {issue.weight}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-200 mb-1">{issue.title}</h4>
                                <p className="text-xs leading-relaxed text-slate-400">{issue.description}</p>
                            </div>

                            {/* Visual Importance Indicator */}
                            {issue.weight >= 4 && (
                                <div className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
