import {Outlet, useNavigate} from "react-router";
import {useUser} from "@clerk/clerk-react";
import {useEffect} from "react";

import AdminNavigation from "../components/admin-compnents/AdminNavigation.tsx";


export function AdminLayout() {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (!isSignedIn) {
            navigate("/sign-in");
            return;
        }

        if (user?.publicMetadata?.role !== "admin") {
            navigate("/");
        }
    }, [isLoaded, isSignedIn, navigate, user]);
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex">
                <AdminNavigation/>
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>


        </>
    );
}


