import { FileText } from "lucide-react";
import { cn } from "../../../lib/utils";

interface KoreaImpactSectionProps {
    data: {
        symbol: string;
        name: string;
        impact: string;
        reason: string;
    }[];
}

export function KoreaImpactSection({ data }: KoreaImpactSectionProps) {
    return (
        <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300 px-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                Korea Market Impact
            </h3>
            <div className="grid gap-3">
                {data.map((item) => (
                    <div key={item.symbol} className="rounded-xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm flex items-start justify-between mx-1">
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
    );
}
