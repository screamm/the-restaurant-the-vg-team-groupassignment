import axios from "axios";
import { useState } from "react";
import { AdminBooking } from "../models/IAdminBooking";

export const AdminHandleBooking = () => {
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBookings = async () => {
        try {
            const response = await axios.get<AdminBooking[]>(
                "https://school-restaurant-api.azurewebsite.net/booking/update/:id"
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
            <h1>Admin bokningshantering</h1>
            <input
                type="text"
                placeholder="Sök efter namn..."
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
                        </li>
                    ))}
            </ul>
        </div>
    );
};