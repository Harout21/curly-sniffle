import {createBrowserRouter} from "react-router-dom";

import Home from "../pages/Home";
import Stones from "../pages/Stones";
import StoneDetails from "../pages/StoneDetails";
import RootLayout from "../layouts/RootLayout";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {index: true, element: <Home/>},

            // 🌐 STONES PAGE
            {path: "stones", element: <Stones/>},

            // 🔎 SINGLE STONE PAGE
            {path: "stones/:id", element: <StoneDetails/>},

            {
                path: "projects",
                element: <Projects/>,
            },
            {
                path: "projects/:id",
                element: <ProjectDetails/>,
            }
        ],
    },
]);