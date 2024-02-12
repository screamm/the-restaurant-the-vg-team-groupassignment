import { useEffect, useState } from "react";
import axios from "axios";
import { AdminBooking } from "../models/IAdminBooking";

export const AdminSearchBooking = () => {
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get<AdminBooking[]>(
                `https://school-restaurant-api.azurewebsite.net/booking/update/${bookingId}`
            );
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleSearch = () => {
        fetchBookings();
    };
   
    return (
        <div>
            <input
                type="text"
                placeholder="Sök efter namn eller bokningsID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Sök</button>
            <h2>Bokningar</h2>
            <ul>
                {bookings.filter((booking) => booking.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((booking) => (
                        <li key={booking.id}>
                            {booking.date} {booking.time} - {booking.numberOfGuests} gäster
                            <button onClick={handleChange}>Ändra bokning</button>
                            <button onClick={deleteBooking}>Radera bokning</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};