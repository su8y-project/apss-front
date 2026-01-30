import { useRef } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { BriefingResponse } from "../../../lib/mock-data";

interface BriefingHeaderProps {
    data?: BriefingResponse; // Make optional for loading state
    selectedDate: string;
    onDateSelect: (date: string) => void;
    isLoading?: boolean;
}

export function BriefingHeader({ data, selectedDate, onDateSelect, isLoading }: BriefingHeaderProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Format date for display: "01.29 (Wed)"
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const md = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        return { md, day };
    };

    return (
        <header className="flex flex-col gap-4 border-b border-white/5 pb-2">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-100">Morning Briefing</h2>
                        <p className="text-xs text-slate-500">AI Analysis Center</p>
                    </div>
                </div>
            </div>

            {/* Date Navigation */}
            <div className="relative flex items-center gap-2 px-2">
                <button
                    disabled={isLoading}
                    className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex-1 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth mask-linear-fade"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {isLoading ? (
                        // Skeleton Loading State
                        Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex min-w-[80px] flex-col items-center justify-center rounded-lg border border-white/5 bg-slate-900/40 py-2 gap-1 animate-pulse"
                            >
                                <div className="h-3 w-8 bg-slate-800 rounded" />
                                <div className="h-4 w-12 bg-slate-800 rounded" />
                            </div>
                        ))
                    ) : (
                        // Data Loaded State
                        data?.data.map((day) => {
                            const { md, day: weekDay } = formatDate(day.date);
                            const isSelected = selectedDate === day.date;

                            return (
                                <button
                                    key={day.date}
                                    onClick={() => onDateSelect(day.date)}
                                    className={cn(
                                        "flex min-w-[80px] flex-col items-center justify-center rounded-lg border py-2 transition-all",
                                        isSelected
                                            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20"
                                            : "border-white/5 bg-slate-900/40 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                                    )}
                                >
                                    <span className="text-[10px] uppercase opacity-70">{weekDay}</span>
                                    <span className="text-xs font-bold font-mono">{md}</span>
                                </button>
                            );
                        })
                    )}
                </div>

                <button
                    disabled={isLoading}
                    className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
}
