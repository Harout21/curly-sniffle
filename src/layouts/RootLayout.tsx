import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">

            <Navigation />

            <main className="flex-1 pt-[96px]">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}