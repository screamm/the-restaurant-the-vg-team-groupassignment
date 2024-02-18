import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { BookingsPage } from "./pages/BookingsPage";
import { Admin } from "./pages/Admin";
import { BookingRender } from "./pages/BookingRender";
import { AddBookingAdmin } from "./pages/AddBookingAdmin";


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
        path: "/booking",
        element: <BookingsPage />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },

      {
        path: "/Booking/:id",
        element: <BookingRender />
      },
      {
        path: "/Admin/add",
        element: <AddBookingAdmin />
      }

    ],
  },
]);
