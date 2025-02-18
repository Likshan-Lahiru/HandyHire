import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayOut } from "./layouts/RootLayOut.tsx";
import { DashBoardPage } from "./pages/user-pages/DashBoardPage.tsx";
import { ToolPage } from "./pages/user-pages/ToolPage.tsx";
import { FavouritePage } from "./pages/user-pages/favouritePage.tsx";
import { DrillPage } from "./pages/subPage/DrillPage.tsx";
import { GrinderPage } from "./pages/subPage/GrinderPage.tsx";
import { LaderPage } from "./pages/subPage/LaderPage.tsx";
import { PalachiPage } from "./pages/subPage/PalachiPage.tsx";
import { GrassCutter } from "./pages/subPage/GrassCutter.tsx";
import ToolRentCartPage from "./pages/user-pages/ToolRentPage.tsx";


import { CartProvider } from "./pages/subPage/context.tsx";
import {SignInPage} from "./pages/SignInPage.tsx";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {ClerkProvider} from "@clerk/clerk-react";
import {AdminLayout} from "./layouts/AdminLayout.tsx";
import {AdminPage} from "./pages/Admin-pages/AdminPage.tsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

function App() {
    const routes = createBrowserRouter([
        {
            element: <RootLayOut />,
            children: [
                { path: '/', element: <DashBoardPage /> },
                { path: '/tool', element: <ToolPage /> },
                { path: '/toolRent', element: <ToolRentCartPage /> },
                { path: '/favourite', element: <FavouritePage /> },
                { path: '/grinder', element: <GrinderPage /> },
                { path: '/drill', element: <DrillPage /> },
                { path: '/ladder', element: <LaderPage /> },
                { path: '/palanchi', element: <PalachiPage /> },
                { path: '/grass-cutters', element: <GrassCutter /> },

            ]
        }
        ,{
            element: <AdminLayout />,
            children: [
                { path: '/admin/admin-dashboard', element: <AdminPage /> },


            ]
        },
        {
            path: "/sign-in",
            element: <SignInPage />,
        },
        {
            path: "/sign-up",
            element: <SignUpPage />,
        },
    ]);

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <CartProvider>
                <RouterProvider router={routes} />
            </CartProvider>
        </ClerkProvider>

    );
}

export default App;
