import { AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorState({
    title = "오류가 발생했습니다",
    message,
    onRetry,
    className
}: ErrorStateProps) {
    return (
        <div className={cn("flex h-full flex-col items-center justify-center gap-4 p-6 text-center", className)}>
            <div className="rounded-full bg-red-500/10 p-3">
                <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-200">{title}</h3>
                <p className="mt-1 text-xs text-slate-500">{message}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                    다시 시도
                </button>
            )}
        </div>
    );
}
