import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/FooterInfo";

export const Layout = () => {
  return (
    <>
    <div className="h-screen flex flex-col border-8 border-pink-600">
      <header className="flex h-20 bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4 border-8 border-pink-600">
        <div className="flex-row w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Navigation />
        </div>
      </header>

      <main className="flex flex-1 bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4 border-8 border-pink-600">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:items-center mt-10 border-8 border-pink-600">
        <Outlet />
        </div>
      </main>

      <footer className="flex h-40 bg-gradient-to-r from-emerald-100 to-emerald-500 rounded-lg shadow m-4 border-8 border-pink-600">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between border-8 border-pink-600">
        <Footer />  
        </div>
      </footer>
      </div>
    </>
  );
};

