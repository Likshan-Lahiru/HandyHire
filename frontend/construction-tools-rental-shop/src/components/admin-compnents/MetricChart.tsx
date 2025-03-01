import { PieChart, Pie, Cell } from "recharts";
const data = [
    {
        name: "Monthly",
        value: 6438,
    },
    {
        name: "Weekly",
        value: 2359,
    },
];
const COLORS = ["#6B7280", "#4FD1C5"];
export const TargetChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-gray-600 text-lg font-medium mb-4">Target</h2>
            <div className="flex justify-center">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#4FD1C5] mr-2"></div>
                    <span className="text-sm text-gray-600">Weekly Targets</span>
                    <span className="ml-2 font-medium">$ 2,359</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#6B7280] mr-2"></div>
                    <span className="text-sm text-gray-600">Monthly targets</span>
                    <span className="ml-2 font-medium">$ 6,438</span>
                </div>
            </div>
        </div>
    );
};
