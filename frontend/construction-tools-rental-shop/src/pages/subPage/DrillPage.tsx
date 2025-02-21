import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { ToolCard } from "../../components/ToolCard";
import { getTools } from "../../reducers/toolReducer";
import ToolModel from "../../model/ToolModel";

export function DrillPage() {
    const dispatch = useDispatch<AppDispatch>();
    const tools = useSelector((state: RootState) => state.tool);

    useEffect(() => {
        if (!tools || tools.length === 0) {
            dispatch(getTools());
        }
    }, [dispatch, tools]);

    return (
        <div className="border-10 border-gray-300 rounded-lg w-full p-4 md:p-6 lg:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tools && tools.length > 0 ? (
                tools.map((tool: ToolModel, index: number) => (
                    <ToolCard key={index} {...tool} />
                ))
            ) : (
                <p className="text-center col-span-full">Loading tools...</p>
            )}
        </div>
    );
}
