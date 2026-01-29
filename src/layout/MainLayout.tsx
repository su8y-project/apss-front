import type { PropsWithChildren } from "react";
import { Header } from "../components/Header";

export function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-screen w-full flex-col bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
            <Header />
            <main className="flex-1 overflow-hidden p-4 sm:p-6">
                <div className="h-full w-full max-w-[1920px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
