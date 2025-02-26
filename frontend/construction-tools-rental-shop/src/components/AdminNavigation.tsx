import { useState } from "react";

import {LayoutDashboard, BarChart, Settings,  List, ChartBarStacked} from "lucide-react";
import {NavLink} from "react-router";
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";

export default function AdminNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">

            <button
                className="md:hidden p-4 text-white bg-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >

            </button>


            <div
                className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <h1 className="text-2xl font-bold mb-6 flex items-center">
                    <div className="flex gap-x-4 items-center">
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                        <SignedOut>
                            <NavLink to={"/sign-in"}>Sign In</NavLink>

                            <NavLink className="text-blue-600 hover:text-white-500 transition duration-300"
                                     to={"/sign-up"}>Sign Up</NavLink>

                        </SignedOut>
                    </div>
                </h1>

                <nav>
                    <ul>
                        <li className="mb-4 flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <NavLink to="/admin/admin-dashboard"
                                     className="hover:text-blue-500 transition duration-300"><LayoutDashboard
                                className="mr-3"/> Dashboard</NavLink>

                        </li>
                        <li className="mb-4 flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <NavLink to="/admin/tool" className="hover:text-blue-500 transition duration-300"><List className="mr-3" /> Tool</NavLink>

                        </li>
                        <li className="mb-4 flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <NavLink to="/admin/order" className="hover:text-blue-500 transition duration-300"><ChartBarStacked className="mr-3" /> Orders</NavLink>
                        </li>
                        <li className="mb-4 flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <NavLink to="/admin/report" className="hover:text-blue-500 transition duration-300"><BarChart className="mr-3" />  Reports</NavLink>

                        </li>
                        <li className="mt-6 mb-4 text-gray-400 uppercase text-sm">Configuration</li>
                        <li className="mb-4 flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <NavLink to="/admin/setting" className="hover:text-blue-500 transition duration-300"><Settings className="mr-3" /> Settings</NavLink>

                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}