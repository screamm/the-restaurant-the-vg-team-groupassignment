

import axios from "axios";
import { useEffect, useState } from "react";
import { IChangeBooking } from "../models/IChangeBooking";


export const AdminSearchBooking = () => {
    const [bookings, setBookings] = useState<IChangeBooking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedBooking, setSearchedBooking] = useState<IChangeBooking | null>(null);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const response = await axios.get<IChangeBooking[]>(
                `https://school-restaurant-api.azurewebsites.net/booking/update/`
            );
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching booking:", error);
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
                placeholder="Search for booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchedBooking && (
                <ul>
                    <li key={searchedBooking.id}>
                        {searchedBooking.date} {searchedBooking.time} - {searchedBooking.numberOfGuests} guests
                    </li>
                </ul>
            )}
        </div>
    );
};






// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IChangeBooking } from "../models/IChangeBooking";

// export const AdminSearchBooking = () => {
//     const [bookings, setBookings] = useState<IChangeBooking[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchedBooking, setSearchedBooking] = useState<IChangeBooking> | null>(null);

//     useEffect(() => {
//         fetchBooking();
//     }, []);

//     const fetchBooking = async () => {
//         try {
//             const response = await axios.get<IChangeBooking[]>(
//                 `https://school-restaurant-api.azurewebsite.net/booking/update/`
//             );
//             setBookings(response.data);
//         } catch (error) {
//             console.error("Kunde inte hämta bokning:", error);
//         }
//     };

//     const handleSearch = () => {
//         const foundBooking = bookings.find(booking => booking.id === searchTerm);
//         setSearchedBooking(foundBooking || null);
//     };
   
//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Sök efter bokningsID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button onClick={handleSearch}>Sök</button>
//             {searchedBooking && (
//                 <ul>
//                     <li key={searchedBooking.id}>
//                         {searchedBooking.date} {searchedBooking.time} - {searchedBooking.numberOfGuests} gäster
//                     </li>
//                 </ul>
//             )}
//         </div>
//     );
// };