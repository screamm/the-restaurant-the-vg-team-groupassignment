import { useEffect, useState } from "react";
import axios from "axios";
import { ChangeBooking } from "../models/IChangeBooking";

export const AdminSearchBooking = () => {
    const [bookings, setBookings] = useState<ChangeBooking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedBooking, setSearchedBooking] = useState<ChangeBooking> | null>(null);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const response = await axios.get<ChangeBooking[]>(
                `https://school-restaurant-api.azurewebsite.net/booking/update/`
            );
            setBookings(response.data);
        } catch (error) {
            console.error("Kunde inte hämta bokning:", error);
        }
    };

    const handleSearch = () => {
        const foundBooking = bookings.find(booking => booking.id === searchTerm);
        setSearchedBooking(foundBooking || null);
    };
   
    return (
        <div>
            <input
                type="text"
                placeholder="Sök efter bokningsID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Sök</button>
            {searchedBooking && (
                <ul>
                    <li key={searchedBooking.id}>
                        {searchedBooking.date} {searchedBooking.time} - {searchedBooking.numberOfGuests} gäster
                    </li>
                </ul>
            )}
        </div>
    );
};