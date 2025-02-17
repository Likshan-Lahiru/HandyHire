import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayOut} from "./components/RootLayOut.tsx";
import {DashBoardPage} from "./pages/DashBoardPage.tsx";
import {ToolPage} from "./pages/ToolPage.tsx";
import {ToolRentPage} from "./pages/ToolRentPage.tsx";
import {FavouritePage} from "./pages/favouritePage.tsx";
import {UserProfilePage} from "./pages/UserProfilePage.tsx";
import {DrillPage} from "./pages/subPage/DrillPage.tsx";
import {GrinderPage} from "./pages/subPage/GrinderPage.tsx";
import {LaderPage} from "./pages/subPage/LaderPage.tsx";
import {PalachiPage} from "./pages/subPage/PalachiPage.tsx";
import {GrassCutter} from "./pages/subPage/GrassCutter.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayOut />,
            children: [
                { path: '/', element: <DashBoardPage /> },
                { path: '/tool', element: <ToolPage /> },
                { path: '/toolRent', element: <ToolRentPage /> },
                { path: '/favourite', element: <FavouritePage /> },
                { path: '/profile', element: <UserProfilePage /> },
                { path: '/grinder', element: <GrinderPage /> },
                { path: '/drill', element: <DrillPage /> },
                { path: '/ladder', element: <LaderPage /> },
                { path: '/palanchi', element: <PalachiPage /> },
                { path: '/grass-cutters', element: <GrassCutter /> },
            ]
        },
    ]);

    return <RouterProvider router={routes} />;
}

export default App;