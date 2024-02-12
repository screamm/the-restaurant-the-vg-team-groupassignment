import axios from "axios";
import { useEffect, useState } from "react";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";

interface AllBookingsProps {
    restaurantId: string;
}

export const AllBookings = ({restaurantId}: AllBookingsProps) => {
    const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);

    useEffect(() => {
        getAllBookings();
    }, []);

    const getAllBookings = async () => {
        const response = await axios.get(
            `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
        );
        const bookingsWithNames = await Promise.all(
            response.data.map(async (booking) => {
                const customerResponse = await axios.get(
                    `https://school-restaurant-api.azurewebsites.net/customer/${booking.customerId}`
            );
        const [user] = customerResponse.data;
            return {
                ...booking,
                customerName: `${user.name} ${user.lastname}`
            };
        })
    );
    setBookings(bookingsWithNames);
    };

return (
    <div>
        <h2>Alla bokningar:</h2>
        {bookings.map((booking) => (
            <div key={booking.id}>
                Namn: {booking.customerName} {booking.customerLastname} 
                Datum:{" "}{booking.date} 
                Tid: {booking.time} 
                Antal gäster:{" "}{booking.numberOfGuests}
            </div>
        ))}
    </div>
  );
}