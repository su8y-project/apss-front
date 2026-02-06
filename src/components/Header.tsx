import { Activity, Copy, Download, Github, Link, LogOut, Share2, ShieldCheck, X } from "lucide-react";
// import { GoogleLogo } from "./GoogleLogo";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useAuth } from "../features/auth/api/useAuth";
import { useLogout } from "../features/auth/api/useLogout";
import { ProfileEditModal } from "../features/user/components/ProfileEditModal";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const { data: user } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
        setIsShareOpen(false);
    };

    const handleDownload = async () => {
        setIsShareOpen(false); // Close menu first to avoid capturing it
        const loadingToast = toast.loading("Generating screenshot...");
        try {
            // Wait a tick for the menu to close completely
            await new Promise(resolve => setTimeout(resolve, 100));

            const element = document.body;
            const canvas = await html2canvas(element, {
                useCORS: true,
                backgroundColor: '#020617',
                scale: 2,
                ignoreElements: (element) => element.classList.contains('sonner-toast') // Try to ignore toasts
            });

            canvas.toBlob((blob) => {
                if (!blob) throw new Error("Canvas blob failed");
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `briefing-dashboard-${new Date().toISOString().split('T')[0]}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
                toast.dismiss(loadingToast);
                toast.success("Screenshot saved");
            });
        } catch (error) {
            console.error('Screenshot failed:', error);
            toast.dismiss(loadingToast);
            toast.error("Failed to generate screenshot");
        }
    };

    const handleCopyImage = async () => {
        setIsShareOpen(false); // Close menu first to avoid capturing it
        const loadingToast = toast.loading("Copying to clipboard...");
        try {
            // Wait a tick for the menu to close completely
            await new Promise(resolve => setTimeout(resolve, 100));

            const element = document.body;
            const canvas = await html2canvas(element, {
                useCORS: true,
                backgroundColor: '#020617',
                scale: 2,
                ignoreElements: (element) => element.classList.contains('sonner-toast') // Try to ignore toasts
            });

            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error("Canvas blob failed");
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);

                toast.dismiss(loadingToast);
                toast.success("Screenshot copied!");
            });
        } catch (error) {
            console.error('Screenshot copy failed:', error);
            toast.dismiss(loadingToast);
            toast.error("Failed to copy screenshot");
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { mutate: logout } = useLogout();

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    // Determine user profile based on useAuth or prefer useUserProfile if we want to ensure latest data for edit
    // However, user passed to Header often comes from useAuth.
    // Let's assume `user` prop has necessary data, but for editing we might needs specific fields.
    // The `User` interface in Auth types now matches UserProfile mostly.

    // We need to fetch the full profile if `user` from auth is missing fields or stale, 
    // but provided `user` seems to map to `UserProfile` structure now.
    // Let's cast user to UserProfile or use useUserProfile hook here as well / fetch it when modal opens.
    // Since we updated User type to match UserProfile, we can pass it directly.

    return (
        <>
            <header className={cn("flex items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 py-3 backdrop-blur-xl", className)}>
                {/* Logo Section */}
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20">
                            <Activity className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-wide text-indigo-100"><span
                                className="text-indigo-500">PAIA</span></h1>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">v0.0.2</p>
                        </div>
                    </div>

                    {/* Secure Badge */}
                    <div className="ml-4 flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 ring-1 ring-emerald-500/20">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-400">SECURED</span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Tools */}
                    <div className="mr-4 flex items-center gap-2 border-r border-white/5 pr-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsShareOpen(!isShareOpen)}
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                                    isShareOpen ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                )}
                                title="Share Dashboard"
                            >
                                {isShareOpen ? <X className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                            </button>

                            {/* Share Dropdown */}
                            {isShareOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl ring-1 ring-black/50 z-50">
                                    <button
                                        onClick={handleCopyLink}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <Link className="h-4 w-4 text-indigo-400" />
                                        <span>Copy Link</span>
                                    </button>
                                    <button
                                        onClick={handleCopyImage}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <Copy className="h-4 w-4 text-sky-400" />
                                        <span>Copy Screenshot</span>
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <Download className="h-4 w-4 text-emerald-400" />
                                        <span>Save Screenshot</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                            <ShieldCheck className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Auth Section */}
                    {user ? (
                        <div className="flex items-center gap-3 pl-2 anim-scale-in relative group">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-200">{user.nickname}</p>
                                <p className="text-[10px] text-slate-500">Premium Plan</p>
                            </div>
                            <button className="relative outline-none">
                                <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-slate-800 transition-all group-hover:ring-indigo-500 bg-slate-700 flex items-center justify-center">
                                    {user.profileImageUrl ? (
                                        <img
                                            src={user.profileImageUrl}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-300">
                                            {user.nickname.slice(0, 2).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950"></div>
                            </button>

                            {/* Profile Dropdown - Hover or Click based? 
                                Making it hover based for simplicity or click. 
                                Let's use CSS group-hover for visibility for now or simple JS state if we want persistence.
                                Given the description "login 한 상태로도 profile을 변경할 수 있어야돼", explicit action like Edit is good.
                            */}
                            <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl ring-1 ring-black/50">
                                    <button
                                        onClick={() => setIsEditProfileOpen(true)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <Activity className="h-4 w-4 text-indigo-400" />
                                        <span>Edit Profile</span>
                                    </button>
                                    <button
                                        onClick={() => logout()}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <LogOut className="h-4 w-4 text-red-400" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                                window.location.href = `${baseUrl}/auth/oauth/login/github?redirect_uri=${window.location.href}`;
                            }}

                            className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 text-white/60 transition-all hover:bg-slate-700 hover:ring-1 hover:ring-white/10"
                        >
                            <Github className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </header>

            {/* Modal - Rendered outside header usually but inside Fragment here works */}
            {user && (
                <ProfileEditModal
                    isOpen={isEditProfileOpen}
                    onClose={() => setIsEditProfileOpen(false)}
                    initialData={user}
                />
            )}
        </>
    );
}
