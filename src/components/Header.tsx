import { Activity, Database, ShieldCheck, Share2, Link, Camera, X, Download, Copy, LogOut, Github } from "lucide-react";
// import { GoogleLogo } from "./GoogleLogo";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock Auth State
    const dropdownRef = useRef<HTMLDivElement>(null);



    const handleLogout = () => {
        setIsLoggedIn(false);
        toast.info("Signed out successfully");
    };


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

    const handleScreenshot = async (action: 'download' | 'copy') => {
        setIsShareOpen(false); // Close menu first to avoid capturing it

        const loadingToast = toast.loading(action === 'download' ? "Saving screenshot..." : "Copying screenshot...");

        try {
            // Wait a tick for the menu to close completely
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(document.body, {
                ignoreElements: (element) => element.classList.contains('sonner-toast') // Try to ignore toasts
            });

            if (action === 'download') {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `AI_Quant_Dashboard_${new Date().toISOString().slice(0, 10)}.png`;
                link.click();

                toast.dismiss(loadingToast);
                toast.success("Screenshot saved!", {
                    description: "Dashboard capture downloaded successfully."
                });
            } else {
                canvas.toBlob(async (blob) => {
                    if (!blob) throw new Error("Canvas blob failed");
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);

                    toast.dismiss(loadingToast);
                    toast.success("Copied to clipboard!", {
                        description: "Screenshot is ready to paste."
                    });
                });
            }

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
                                onClick={() => handleScreenshot('copy')}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Copy className="h-4 w-4 text-sky-400" />
                                <span>Copy Screenshot</span>
                            </button>
                            <button
                                onClick={() => handleScreenshot('download')}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Download className="h-4 w-4 text-emerald-400" />
                                <span>Save Screenshot</span>
                            </button>
                        </div>
                    )}
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                    <ShieldCheck className="h-4 w-4" />
                </button>

                {/* Auth Section */}
                <div className="border-l border-white/5 pl-6">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-200">Kim Analyst</p>
                                <p className="text-[10px] text-slate-500">Premium Plan</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="group relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-indigo-500/20 transition-all hover:ring-indigo-500"
                            >
                                <img
                                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
                                    alt="User Profile"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <LogOut className="h-3 w-3 text-white" />
                                </div>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => window.location.href = 'http://localhost:8080/auth/oauth/login/github'}
                            className="flex items-center gap-2 rounded-full bg-slate-800 pr-4 pl-3 py-1.5 transition-all hover:bg-slate-700 hover:ring-1 hover:ring-white/10"
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black p-0.5">
                                <Github className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-300">Sign in with GitHub</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
