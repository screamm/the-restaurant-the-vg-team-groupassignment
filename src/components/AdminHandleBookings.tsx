import { useEffect, useState } from "react";
import axios from "axios";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
import { ChangeEvent } from "react";

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

  

  return (
    <div>
      <input
        type="date"
        name="date"
        value={searchDate}
        onChange={handleInputChange}
      />


      {filteredUsers.map((booking) => (
        <li key={booking.id}>
          {booking.date}, {booking.customerName}
        </li>
      ))}
    </div>
  );
};

















