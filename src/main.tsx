import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";
import "./i18n";
import mainLogo from "./images/main.png";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

// favicon
const link: HTMLLinkElement = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = mainLogo;
document.head.appendChild(link);

// apple touch icon
const appleLink: HTMLLinkElement = document.createElement("link");
appleLink.rel = "apple-touch-icon";
appleLink.sizes = "180x180";
appleLink.href = mainLogo;
document.head.appendChild(appleLink);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>
);