import axios from "axios";
import { useEffect, useState } from "react";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";

// interface AllBookingsProps {
//     restaurantId: string;
// }

export const AllBookings = () => {
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

// return (
//     <div>
//         <h2>Alla bokningar:</h2>
//         {bookings.map((booking) => (
//             <div key={booking.id}>
//                 Namn: {booking.customerName} {booking.customerLastname} 
//                 Datum:{" "}{booking.date} 
//                 Tid: {booking.time} 
//                 Antal gäster:{" "}{booking.numberOfGuests}
//             </div>
//         ))}
//     </div>
//   );
// }


return (
    <div>
        <h2>Alla bokningar:</h2>
        <ul>
            {bookings.map((booking, index) => {
                return (
                <li key={index}>
                    Namn: {booking.customerName} {booking.customerLastname}
                    Datum:{" "}{booking.date}
                    Tid: {booking.time}
                    Antal gäster:{" "}{booking.numberOfGuests}
                </li>
                );
            })}
        </ul>
    </div>
  );
}








// import axios from "axios";
// import { useEffect, useState } from "react";

// import { IBookingsRestaurant } from "../models/IBookingsRestaurant";

// interface AllBookingsProps {
//     restaurantId: string;
// }

// export const AllBookings = ({restaurantId}: AllBookingsProps) => {
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

// return (
//     <div>
//         <h2>Alla Bokningar</h2>
//       <ul>
//       {bookings.map((booking, index) => {
//         return (
//         <li key={index}>
//           <p>{booking.id}</p>
//           <p>{booking.date}</p>
//           <p>{booking.time} {booking.numberOfGuests}</p>
//         </li>
//         );
//         })}
//     </ul>
// </div>
//     );
// };









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