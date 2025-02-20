import { DrillPage } from "../subPage/DrillPage.tsx";
import ToolSliderPage from "../subPage/ToolSliderPage.tsx";

export function DashBoardPage() {
    return (
        <div className="border-10 border-gray-300 rounded-lg p-10">
            <ToolSliderPage />
            <DrillPage />
        </div>
    );
}
