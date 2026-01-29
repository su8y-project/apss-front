import { useState } from "react";
import { BRIEFING_DATA } from "../../lib/mock-data";
import { BriefingHeader } from "./components/BriefingHeader";
import { MarketIssuesSection } from "./components/MarketIssuesSection";
import { MacroSection } from "./components/MacroSection";
import { KoreaImpactSection } from "./components/KoreaImpactSection";

export function BriefingPanel() {
    const [selectedDate, setSelectedDate] = useState(BRIEFING_DATA.marketIssues.data[0].date);

    const selectedDayData = BRIEFING_DATA.marketIssues.data.find(d => d.date === selectedDate)
        || BRIEFING_DATA.marketIssues.data[0];

    return (
        <div className="flex flex-col gap-4 p-1 h-full">
            <BriefingHeader
                data={BRIEFING_DATA.marketIssues}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
            />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6 pb-4">
                <MarketIssuesSection
                    date={selectedDate}
                    issues={selectedDayData.issues}
                />

                <MacroSection data={BRIEFING_DATA.macro} />

                <KoreaImpactSection data={BRIEFING_DATA.koreaImpact} />
            </div>
        </div>
    );
}
