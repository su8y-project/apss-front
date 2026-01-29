import { MainLayout } from "./layout/MainLayout";
import { ScoreBoard } from "./features/dashboard/ScoreBoard";
import { BriefingPanel } from "./features/briefing/BriefingPanel";
import { Toaster } from "sonner";

function App() {
  return (
    <MainLayout>
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Panel: Morning Briefing */}
        <section className="col-span-1 lg:col-span-7 flex flex-col gap-4 min-h-0">
          <BriefingPanel />
        </section>

        {/* Right Panel: Score Board */}
        <section className="col-span-1 lg:col-span-5 flex flex-col gap-4 min-h-0 overflow-hidden">
          <ScoreBoard />
        </section>
      </div>
      <Toaster position="top-center" theme="dark" />
    </MainLayout>
  )
}

export default App
