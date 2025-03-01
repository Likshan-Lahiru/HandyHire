import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import { TargetChart } from "../../components/admin-compnents/MetricChart.tsx";
import { UserHitChart } from "../../components/admin-compnents/UserHitChart.tsx";
import { MetricCard } from "../../components/admin-compnents/PieCharts.tsx";
import { DollarSign, ShoppingBag, Users, Wrench } from "lucide-react";

export function AdminPage() {
    const [stats, setStats] = useState({
        totalOrdersPrice: 0,
        totalOrdersCount: 0,
        totalUserCount: 0,
        totalToolCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("http://localhost:8000/api/tools/stats");
                if (!response.ok) {
                    throw new Error("Failed to fetch stats");
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <TargetChart />
                        )}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <UserHitChart />
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Revenue"
                            value={loading ? "..." : `$${stats.totalOrdersPrice}`}
                            period="previous 30 days"
                            status="up"
                            icon={<DollarSign className="w-6 h-6 text-gray-600" />}
                            loading={loading}
                        />
                        <MetricCard
                            title="Total Order"
                            value={loading ? "..." : stats.totalOrdersCount.toLocaleString()}
                            period="previous 30 days"
                            status="down"
                            icon={<ShoppingBag className="w-6 h-6 text-gray-600" />}
                            loading={loading}
                        />
                        <MetricCard
                            title="New Customers"
                            value={loading ? "..." : stats.totalUserCount.toLocaleString()}
                            period="previous 30 days"
                            status="up"
                            icon={<Users className="w-6 h-6 text-gray-600" />}
                            loading={loading}
                        />
                        <MetricCard
                            title="Total Tools"
                            value={loading ? "..." : stats.totalToolCount.toLocaleString()}
                            period="previous 30 days"
                            status="up"
                            icon={<Wrench className="w-6 h-6 text-gray-600" />}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
