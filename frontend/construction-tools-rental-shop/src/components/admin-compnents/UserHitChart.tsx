import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
const data = [
    {
        name: "Jan",
        value: 200,
    },
    {
        name: "Feb",
        value: 400,
    },
    {
        name: "Mar",
        value: 300,
    },
    {
        name: "Apr",
        value: 600,
    },
    {
        name: "May",
        value: 500,
    },
    {
        name: "Jun",
        value: 400,
    },
    {
        name: "Jul",
        value: 300,
    },
    {
        name: "Aug",
        value: 200,
    },
];
export const UserHitChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-gray-600 text-lg font-medium mb-4">User Hit</h2>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4FD1C5"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
            <div className="flex items-center mt-4">
                <div className="w-3 h-3 rounded-full bg-[#4FD1C5] mr-2"></div>
                <span className="text-sm text-gray-600">
          Monthly Unique Visitors Summary
        </span>
            </div>
        </div>
    );
};
