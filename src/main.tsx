// --- Global Hack to Silence Google Maps Non-Passive Touch Event Violations ---
if (typeof window !== 'undefined') {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type: string, listener: any, options: any) {
        if (type === 'touchstart' || type === 'touchmove' || type === 'wheel') {
            if (typeof options === 'boolean') {
                options = { capture: options, passive: true };
            } else if (typeof options === 'object' && options !== null) {
                if (options.passive === undefined) {
                    options = { ...options, passive: true };
                }
            } else if (options === undefined) {
                options = { passive: true };
            }
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
}

// Now your normal imports follow:
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";
import "./i18n";
import { InstallBanner } from "./components/InstallBanner";
import { IOSInstallHint } from "./components/IOSInstallHint";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        updateSW(true);
    },
    onOfflineReady() {
        console.log("Best Project PWA is ready for offline use.");
    },
    onRegisterError(error) {
        console.error("Service worker registration failed:", error);
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
            <InstallBanner />
            <IOSInstallHint />
        </HelmetProvider>
    </React.StrictMode>
);