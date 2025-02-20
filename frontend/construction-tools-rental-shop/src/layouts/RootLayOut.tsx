import {NavigationBar} from "../components/NavigationBar.tsx";
import {Outlet} from "react-router";

export function RootLayOut() {
    return (
        <>
            <NavigationBar />
            <Outlet></Outlet>
        </>
    );
}
