import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSearchBooking } from "./AdminSearchBookings";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
import { ICustomer } from "../models/ICustomer";
import { AdminChangeBooking } from "./AdminChangeBookings";
import { AdminDeleteBooking } from "./AdminDeleteBookings";

export const AdminHandleBookings = () => {
  const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    const response = await axios.get(
      `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
    );

    const bookingsWithNames = await Promise.all(
      response.data.map(async (booking: ICustomer) => {
        const customerResponse = await axios.get(
          `https://school-restaurant-api.azurewebsites.net/customer/${booking.customerId}`
        );
        const [user] = customerResponse.data;
        return {
          ...booking,
          customerName: `${user.name} ${user.lastname}`,
        };
      })
    );
    setBookings(bookingsWithNames);
    setFilteredBookings([]);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = bookings.filter((booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  return (
    <div>
      <AdminSearchBooking handleSearch={handleSearch} />
      <h2>Sökresultat:</h2>
      {filteredBookings.length === 0 && (
        <p>Finns ingen bokning med det angivna namnet!</p>
      )}
      <ul>
        {filteredBookings.map((booking) => {
          return (
          <li key={booking._id}>
            <p>
              BokningsID: {booking._id} <br/>
              Namn: {booking.customerName} {booking.customerLastname} <br/>
              Datum: {booking.date} <br/>
              Tid: {booking.time} <br/>
              Antal gäster: {booking.numberOfGuests} <br/>
            </p>
            <AdminChangeBooking booking={booking} />
            <AdminDeleteBooking bookingId={booking._id} />
          </li>
        );
        })}
      </ul>
      
      <h2>Alla bokningar:</h2>
      <ul>
      {bookings.map((booking) => (
        <li key={booking._id}>
          Namn: {booking.customerName} {booking.customerLastname} <br/>
          Datum: {booking.date} <br/>
          Tid: {booking.time} <br/>
          Antal gäster: {booking.numberOfGuests} <br/>
        </li>
        ))}
      </ul>
  </div>
);
};
