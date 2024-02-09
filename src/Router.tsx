import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { Booking } from "./pages/Booking";
import { Admin } from "./pages/Admin";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },

      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Booking",
        element: <Booking />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },

    ],
  },
]);
