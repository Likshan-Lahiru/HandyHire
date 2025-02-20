import {Outlet, useNavigate} from "react-router";
import {useUser} from "@clerk/clerk-react";
import {useEffect} from "react";
import {NavigationBar} from "../components/NavigationBar.tsx";

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
            <NavigationBar />
            <Outlet></Outlet>
        </>
    );
}
