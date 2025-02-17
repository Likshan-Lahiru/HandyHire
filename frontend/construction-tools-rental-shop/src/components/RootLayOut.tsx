import {Navigation} from "./Navigation.tsx";
import {Outlet} from "react-router";

export function RootLayOut() {
    return (
        <>
            <Navigation />
        <Outlet></Outlet>
        </>
    );
}
