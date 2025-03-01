import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { RootLayOut } from "./layouts/RootLayOut.tsx";
import { DashBoardPage } from "./pages/user-pages/DashBoardPage.tsx";
import { ToolPage } from "./pages/subPage/ToolPage.tsx";
import { DrillPage } from "./pages/subPage/DrillPage.tsx";
import { GrinderPage } from "./pages/subPage/GrinderPage.tsx";
import { LaderPage } from "./pages/subPage/LaderPage.tsx";
import { PalanchiPage } from "./pages/subPage/PalanchiPage.tsx";
import { GrassCutter } from "./pages/subPage/GrassCutter.tsx";
import ToolRentCartPage from "./pages/user-pages/ToolRentPage.tsx";
import { CartProvider } from "./pages/subPage/context.tsx";
import { SignInPage } from "./pages/SignInPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { AdminPage } from "./pages/Admin-pages/AdminPage.tsx";
import {store} from "./store/store.ts";
import {ToolAdminPage} from "./pages/Admin-pages/ToolAdmin-page.tsx";
import {AdminLayout} from "./layouts/AdminLayout.tsx";
import {CategoryAdminPage} from "./pages/Admin-pages/Category-admin-page.tsx";

import {SettingAdminPage} from "./pages/Admin-pages/setting-admin-page.tsx";
import {ReportAdminPage} from "./pages/Admin-pages/Report-admin-page.tsx";
import {FavoritesGrid} from "./pages/user-pages/favouritePage.tsx";
import OrderAdminPage from "./pages/Admin-pages/order-admin-page.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

function App() {
    const routes = createBrowserRouter([
        {
            element: <RootLayOut />,
            children: [
                { path: '/', element: <DashBoardPage /> },
                { path: '/tool', element: <ToolPage /> },
                { path: '/toolRent', element: <ToolRentCartPage /> },
                { path: '/favourite', element: <FavoritesGrid /> },
                { path: '/grinder', element: <GrinderPage /> },
                { path: '/drill', element: <DrillPage /> },
                { path: '/ladder', element: <LaderPage /> },
                { path: '/palanchi', element: <PalanchiPage /> },
                { path: '/grass-cutters', element: <GrassCutter /> },
            ]
        },
        {
            element: <AdminLayout />,
            children: [
                { path: '/admin/admin-dashboard', element: <AdminPage /> },
                { path: '/admin/tool', element: <ToolAdminPage /> },
                { path: '/admin/category', element: <CategoryAdminPage /> },
                { path: '/admin/order', element: <OrderAdminPage /> },
                { path: '/admin/setting', element: <SettingAdminPage /> },
                { path: '/admin/report', element: <ReportAdminPage /> },
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
        <Provider store={store}>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                <CartProvider>
                    <RouterProvider router={routes} />
                </CartProvider>
            </ClerkProvider>
        </Provider>
    );
}

export default App;
