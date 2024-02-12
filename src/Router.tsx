import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { Bookings } from "./pages/BookingsPage";
import { Admin } from "./pages/Admin";
import { Booking } from "./pages/Booking";


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
        path: "/BookingsPage",
        element: <Bookings />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/Booking/:id"
        
      }

      {
        path: "/Booking/:id",
        element: <Booking />
      }

    ],
  },
]);
