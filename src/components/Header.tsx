import { Activity, Database, ShieldCheck, Share2, Link, Camera, X, Download } from "lucide-react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!", {
            description: "Anyone with this link can view the current dashboard state."
        });
        setIsShareOpen(false);
    };

    const handleScreenshot = async () => {
        setIsShareOpen(false); // Close menu first to avoid capturing it

        const loadingToast = toast.loading("Capturing dashboard...");

        try {
            // Wait a tick for the menu to close completely
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(document.body, {
                ignoreElements: (element) => element.classList.contains('sonner-toast') // Try to ignore toasts
            });

            const image = canvas.toDataURL("image/png");

            // Create download link
            const link = document.createElement('a');
            link.href = image;
            link.download = `AI_Quant_Dashboard_${new Date().toISOString().slice(0, 10)}.png`;
            link.click();

            toast.dismiss(loadingToast);
            toast.success("Screenshot saved!", {
                description: "Dashboard capture downloaded successfully."
            });
        } catch (error) {
            console.error("Screenshot failed:", error);
            toast.dismiss(loadingToast);
            toast.error("Screenshot failed", {
                description: "Could not capture the dashboard."
            });
        }
    };

    // ... (rest of render)

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

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsShareOpen(!isShareOpen)}
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                            isShareOpen ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                        )}
                        title="Share Dashboard"
                    >
                        {isShareOpen ? <X className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    </button>

                    {/* Share Dropdown */}
                    {isShareOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-slate-900/90 p-1 shadow-xl backdrop-blur-xl ring-1 ring-black/50 z-50">
                            <button
                                onClick={handleCopyLink}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Link className="h-4 w-4 text-indigo-400" />
                                <span>Copy Link</span>
                            </button>
                            <button
                                onClick={handleScreenshot}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Camera className="h-4 w-4 text-emerald-400" />
                                <span>Save Screenshot</span>
                            </button>
                        </div>
                    )}
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                    <ShieldCheck className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
}
