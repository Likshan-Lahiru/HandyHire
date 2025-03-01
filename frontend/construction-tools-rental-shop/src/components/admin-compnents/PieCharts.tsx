import React from "react";
interface MetricCardProps {
    title: string;
    value: string | number;
    period: string;
    status: "up" | "down";
    icon: React.ReactNode;
}
export const MetricCard = ({
                               title,
                               value,
                               period,
                               status,
                               icon,
                           }: MetricCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
                    <p className="text-2xl font-semibold text-gray-800">{value}</p>
                    <div className="flex items-center mt-2">
            <span
                className={`text-xs ${status === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {status === "up" ? "↑" : "↓"} {status === "up" ? "up" : "down"}
            </span>
                        <span className="text-gray-500 text-xs ml-1">({period})</span>
                    </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            <button className="text-purple-600 text-sm mt-4">Full Details</button>
        </div>
    );
};
