import { useState } from "react";
import { LayoutDashboard, BarChart, Settings, List, ChartBarStacked } from "lucide-react";
import { NavLink } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const navItems = [
    { to: "/admin/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/tool", label: "Tool", icon: List },
    { to: "/admin/order", label: "Orders", icon: ChartBarStacked },
    { to: "/admin/report", label: "Reports", icon: BarChart },
];

export default function AdminNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">

            <button
                className="md:hidden p-4 text-white bg-gray-800"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                ☰
            </button>


            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >

                <div className="flex items-center gap-x-4 mb-6">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <NavLink to="/sign-in" className="text-blue-500 hover:underline">Sign In</NavLink>
                        <NavLink to="/sign-up" className="text-blue-500 hover:underline ml-4">Sign Up</NavLink>
                    </SignedOut>
                </div>


                <nav>
                    <ul>
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <li key={to} className="mb-4">
                                <NavLink
                                    to={to}
                                    className="group flex items-center p-2 rounded transition duration-300 hover:bg-gray-700"
                                >
                                    <Icon className="mr-3 text-gray-400 group-hover:text-white" />
                                    <span className="group-hover:text-blue-500">{label}</span>
                                </NavLink>
                            </li>
                        ))}


                        <li className="mt-6 mb-4 text-gray-400 uppercase text-sm">Configuration</li>
                        <li className="mb-4">
                            <NavLink
                                to="/admin/setting"
                                className="group flex items-center p-2 rounded transition duration-300 hover:bg-gray-700"
                            >
                                <Settings className="mr-3 text-gray-400 group-hover:text-white" />
                                <span className="group-hover:text-blue-500">Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
