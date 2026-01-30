import { useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { ScoreBoard } from "./features/dashboard/ScoreBoard";
import { BriefingPanel } from "./features/briefing/BriefingPanel";
import { Toaster } from "sonner";
import { BookOpen, LayoutDashboard } from "lucide-react";
import { cn } from "./lib/utils";

function App() {
  const [activeTab, setActiveTab] = useState<'briefing' | 'dashboard'>('briefing');

  return (
    <MainLayout>
      <div className="flex flex-col h-full lg:grid lg:grid-cols-12 lg:gap-6 pb-16 lg:pb-0">
        {/* Left Panel: Morning Briefing */}
        <section className={cn(
          "flex-col gap-4 min-h-0 h-full lg:col-span-7 lg:flex",
          activeTab === 'briefing' ? 'flex' : 'hidden'
        )}>
          <BriefingPanel />
        </section>

        {/* Right Panel: Score Board */}
        <section className={cn(
          "flex-col gap-4 min-h-0 h-full overflow-hidden lg:col-span-5 lg:flex",
          activeTab === 'dashboard' ? 'flex' : 'hidden'
        )}>
          <ScoreBoard />
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-slate-950/80 backdrop-blur-lg lg:hidden px-6 pb-safe">
        <button
          onClick={() => setActiveTab('briefing')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 transition-colors",
            activeTab === 'briefing' ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          )}
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-[10px] font-medium">Briefing</span>
        </button>

        <div className="h-8 w-[1px] bg-white/5" />

        <button
          onClick={() => setActiveTab('dashboard')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 transition-colors",
            activeTab === 'dashboard' ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          )}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
      </div>

      <Toaster position="top-center" theme="dark" />
    </MainLayout>
  )
}

export default App
