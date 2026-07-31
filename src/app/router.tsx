import { useState, useMemo, useEffect } from 'react';
import { createBrowserRouter, useParams, Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Home from "../pages/Home";
import Stones from "../pages/Stones";
import StoneDetails from "../pages/StoneDetails";
import RootLayout from "../layouts/RootLayout";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";

const VALID_LANGS = ['en', 'hy', 'ru'];
const VALID_STONE_TYPES = ['corian', 'grandex'];

// ==========================================
// 🌐 LANGUAGE PATH WRAPPER COMPONENT
// ==========================================
function LangWrapper() {
    const { lang } = useParams<{ lang: string }>();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. If path language parameter is invalid or missing, redirect to preferred or fallback language
        if (!lang || !VALID_LANGS.includes(lang)) {
            const savedLang = localStorage.getItem('lang') || 'hy';
            const cleanPath = location.pathname === '/' ? '' : location.pathname;
            navigate(`/${savedLang}${cleanPath}`, { replace: true });
            return;
        }

        // 2. Sync i18next internal language state with URL state parameters
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }

        // 3. Update HTML metadata and global styling classes
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.body.classList.remove('font-en', 'font-hy', 'font-ru');
        document.body.classList.add(`font-${lang}`);
    }, [lang, i18n, navigate, location.pathname]);

    // Prevent rendering children while layout synchronization completes
    if (!lang || !VALID_LANGS.includes(lang)) return null;

    return <Outlet />;
}

// ==========================================
// 🪨 STONE TYPE VALIDATOR WRAPPER
// ==========================================
function StoneTypeGuard() {
    const { lang, type } = useParams<{ lang: string; type: string }>();

    // Redirect to default stone type ('corian') if the route parameter is unrecognized
    if (!type || !VALID_STONE_TYPES.includes(type.toLowerCase())) {
        return <Navigate to={`/${lang || 'hy'}/stones/corian`} replace />;
    }

    return <Outlet />;
}

// ==========================================
// 🗺️ ROUTER APPLICATION CONFIGURATION
// ==========================================
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={`/${localStorage.getItem('lang') || 'hy'}`} replace />,
    },
    {
        path: "/:lang",
        element: <LangWrapper />,
        children: [
            {
                element: <RootLayout />,
                children: [
                    { index: true, element: <Home /> },

                    // 🌐 STONES ROUTES
                    {
                        path: "stones",
                        children: [
                            // Base "/stones" path redirects straight to Corian by default
                            { index: true, element: <Navigate to="corian" replace /> },

                            // Category-level routes (/stones/corian and /stones/grandex)
                            {
                                element: <StoneTypeGuard />,
                                children: [
                                    { path: ":type", element: <Stones /> },
                                    { path: ":type/:id", element: <StoneDetails /> },
                                ]
                            }
                        ]
                    },

                    // 🛠️ PROJECTS PAGES
                    { path: "projects", element: <Projects /> },
                    { path: "projects/:id", element: <ProjectDetails /> }
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={`/${localStorage.getItem('lang') || 'hy'}`} replace />,
    }
]);