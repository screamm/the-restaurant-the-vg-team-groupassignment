

import axios from "axios";
import { useEffect, useState } from "react";

import { IBookingsRestaurant } from "../models/IBookingsRestaurant";

// interface AllBookingsProps {
//     restaurantId: string;
// }

export const AllBookings = ({restaurantId}) => {
    const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);

    useEffect(() => {
        getAllBookings();
    }, []);

    const getAllBookings = async () => {
        try {
            const response = await axios.get(`https://school-restaurant-api.azurewebsite.net/booking/restaurant/${restaurantId}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Kunde inte hämta bokningsinformation:", error);
        }
    };

    return (
        <div>
            <h2>Alla bokningar</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        Datum: {booking.date} Tid: {booking.time} Antal gäster: {booking.numberOfGuests}
                    </li>
                ))}
            </ul>
        </div>
    );
};











// import axios from "axios";
// import { useEffect, useState } from "react";
// import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
 
// interface AllBookingsProps {
//     restaurantId: string;
// }
 
// export const AllBookings = ({restaurantId}) => {
//     const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
 
//     useEffect(() => {
//         getAllBookings();
//     }, []);
 
//     const getAllBookings = async () => {
//         try {
//             const response = await axios.get(`https://school-restaurant-api.azurewebsite.net/booking/restaurant/${restaurantId}`);
//             setBookings(response.data);
//         } catch (error) {
//             console.error("Kunde inte hämta bokningsinformation:", error);
//         }
//     };
 
//     return (
//         <div>
//             <h2>Alla bokningar</h2>
//             <ul>
//                 {bookings.map(booking => (
//                     <li key={booking.id}>
//                         Datum: {booking.date} Tid: {booking.time} Antal gäster: {booking.numberOfGuests}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };