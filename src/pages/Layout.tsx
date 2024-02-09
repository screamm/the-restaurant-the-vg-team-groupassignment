import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const Layout = () => {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                Här kommer det komma grejor...
            </footer>
        </>
    );
};