import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSearchBooking } from "./AdminSearchBookings";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
import { ICustomer } from "../models/ICustomer";
import { AdminChangeBooking } from "./AdminChangeBookings";
import { AdminDeleteBooking } from "./AdminDeleteBookings";
import { ChangeEvent } from "react";
import {Link} from "react-router-dom";

export const AdminHandleBookings = () => {
  const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IBookingsRestaurant[]>([]);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {

        const response = await axios.get(
            `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`

        );
        
        setBookings(response.data);
        setFilteredBookings([])
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};


     
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = bookings.filter((user) =>
      user.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
    console.log('handlechange', searchTerm);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await axios.delete(
        `https://school-restaurant-api.azurewebsites.net/booking/delete/${_id}`
      );

      console.log(response.data);
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== _id));
      setFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(booking => booking._id !== _id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <Link to={"/admin/add"}><button>Lägg till bokning</button></Link>
      <br />
      <label htmlFor="">Sök bokning på datum: </label>
      <input
        type="date"
        name="date"
        value={searchDate}
        onChange={handleInputChange}
      />


      {filteredUsers.map((booking) => (
        <>
        <li key={booking._id}>
          {booking.date}, {booking._id}
        </li>
        <button onClick={() => handleDelete(booking._id)}>Delete</button>
        </>
      ))}
    </div>
  );
};

















// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AdminSearchBooking } from "./AdminSearchBookings";
// import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
// import { ICustomer } from "../models/ICustomer";
// import { AdminChangeBooking } from "./AdminChangeBookings";
// import { AdminDeleteBooking } from "./AdminDeleteBookings";
// import { ChangeEvent } from "react";

// export const AdminHandleBookings = () => {
//   const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState<IBookingsRestaurant[]>([]);

//   useEffect(() => {
//     getAllBookings();
//   }, []);

//   const getAllBookings = async () => {
//     const response = await axios.get(
//       `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
//     );

//     const bookingsWithNames = await Promise.all(
//       response.data.map(async (booking: ICustomer) => {
//         const customerResponse = await axios.get(
//           `https://school-restaurant-api.azurewebsites.net/customer/${booking.customerId}`
//         );
//         const [user] = customerResponse.data;
//         return {
//           ...booking,
//           customerName: `${user.name} ${user.lastname}`,
//         };
//       })
//     );
//     setBookings(bookingsWithNames);
//     setFilteredBookings([]);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;
//     setSearchItem(searchTerm);

//     const filteredItems = bookings.filter((user) =>
//       user.date.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredUsers(filteredItems);
//     console.log('handlechange', searchTerm);
//   };

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     console.log('sök date');
//     handleInputChange;
//   };

//   return (
//     <div>
//       <input
//         type="date"
//         name="date"
//         value={searchDate}
//         onChange={handleInputChange}
//       />
//       <button
//         onClick={handleClick}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4"
//       >
//         Sök på datum
//       </button>

//       {filteredUsers.map((booking) => (
//         <li key={booking.name}>
//           {booking.date}, {booking.customerName}
//         </li>
//       ))}
//     </div>
//   );
// };
