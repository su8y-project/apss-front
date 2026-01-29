import { Activity, Database, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={cn("flex items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 py-3 backdrop-blur-md", className)}>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20">
                        <Activity className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-wide text-indigo-100">AI QUANT <span className="text-indigo-500">COCKPIT</span></h1>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">System v2.1.0</p>
                    </div>
                </div>

                {/* System Status Indicators */}
                <div className="hidden h-6 items-center gap-2 border-l border-white/5 pl-4 sm:flex">
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        </span>
                        ENGINE ONLINE
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-slate-800/50 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-white/5">
                        <Database className="h-3 w-3" />
                        LOKI: CONNECTED
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Asset Display */}
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-medium uppercase text-slate-500">Available Cash</p>
                        <div className="flex items-center justify-end gap-1 text-sm font-bold text-slate-200 font-mono">
                            <span className="text-slate-600">$</span>
                            <span>241,502.85</span>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/5"></div>
                    <div className="text-right">
                        <p className="text-[10px] font-medium uppercase text-slate-500">Total Equity</p>
                        <div className="flex items-center justify-end gap-1 text-sm font-bold text-amber-400 font-mono">
                            <span className="text-amber-600/50">$</span>
                            <span>1,042,300.00</span>
                        </div>
                    </div>
                </div>

                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                    <ShieldCheck className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
}
