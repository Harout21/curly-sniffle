import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./i18n";
import mainLogo from "./images/main.png";

// Dynamically add favicon
const link: HTMLLinkElement = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = mainLogo;
document.head.appendChild(link);

// Optional: Apple touch icon for mobile bookmarks
const appleLink: HTMLLinkElement = document.createElement("link");
appleLink.rel = "apple-touch-icon";
appleLink.sizes = "180x180";
appleLink.href = mainLogo;
document.head.appendChild(appleLink);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);