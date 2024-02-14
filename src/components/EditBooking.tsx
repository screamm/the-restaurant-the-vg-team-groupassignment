import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import axios from "axios";

interface Booking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    lastname: string;

  };
}

interface Props {
  bookingId: string;
}

export const EditBookingForm = ({ bookingId }: Props) => {
  const [booking, setBooking] = useState<Booking>({
    _id: "",
    restaurantId: "",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `https://school-restaurant-api.azurewebsites.net/booking/${bookingId}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("customer.")) {
      setBooking((prevState) => ({
        ...prevState,
        customer: {
          ...prevState.customer,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      const newValue = name === "numberOfGuests" ? parseInt(value) : value;
      setBooking((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://school-restaurant-api.azurewebsites.net/booking/${bookingId}`,
        booking
      );
      console.log("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <>
      <div>Edit your reservation</div>
      <form onSubmit={onSubmit}>
        <div>
          <label>RestaurantId:</label>
          <input
            type="text"
            placeholder="Add Id"
            name="restaurantId"
            value={booking.restaurantId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            placeholder="Add Date"
            name="date"
            value={booking.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Time</label>
          <select
            name="time"
            value={booking.time}
            onChange={handleInputChange}
          >
            <option value="18.00">18:00</option>
            <option value="21.00">21:00</option>
          </select>
        </div>
        <div>
          <label>How many seats</label>
          <select
            name="numberOfGuests"
            value={booking.numberOfGuests}
            onChange={handleInputChange}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            name="customer.name"
            value={booking.customer.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>LastName</label>
          <input
            type="text"
            placeholder="LastName"
            name="customer.lastname"
            value={booking.customer.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="customer.email"
            value={booking.customer.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="customer.phone"
            value={booking.customer.phone}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-block" type="submit">
          Update reservation
        </button>
      </form>
    </>
  );
};