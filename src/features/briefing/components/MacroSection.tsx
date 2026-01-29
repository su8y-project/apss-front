import { TrendingUp } from "lucide-react";

interface MacroSectionProps {
    data: {
        summary: string;
        events: string[];
    };
}

export function MacroSection({ data }: MacroSectionProps) {
    return (
        <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300 px-2">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                Macro & Finance
            </h3>
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm mx-1">
                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                    {data.summary}
                </p>
                <ul className="space-y-2">
                    {data.events.map((event, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                            {event}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
