import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/FooterInfo";

export const Layout = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Navigation />
        </div>
      </header>

      <main className="bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Outlet />
        </div>
      </main>

      <footer className="bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Footer />  
        </div>
      </footer>
    </>
  );
};
