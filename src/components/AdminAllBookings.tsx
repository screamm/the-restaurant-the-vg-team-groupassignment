import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSearchBooking } from "./AdminSearchBooking";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
import { ICustomer } from "../models/ICustomer";

export const AllBookings = () => {
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
      {filteredBookings.map((booking) => (
        <div key={booking.id}>
          Namn: {booking.customerName} {booking.customerLastname} 
          Datum: {booking.date} 
          Tid: {booking.time} 
          Antal gäster: {booking.numberOfGuests}
        </div>
      ))}
      <h2>Alla bokningar:</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          Namn: {booking.customerName} {booking.customerLastname} 
          Datum: {booking.date} 
          Tid: {booking.time} 
          Antal gäster: {booking.numberOfGuests}
        </div>
      ))}
  </div>
);
};
