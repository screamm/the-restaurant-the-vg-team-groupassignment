import axios from "axios";
import { useEffect, useState } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";

import { IBookings } from "../models/IBookings";

export const AddBookingAdmin = () => {
    const { id } = useParams();
    const [restaurants, setRestaurants] = useState<IBookings[]>([]);

    const [addBooking, setAddBooking] = useState({
        restaurantId: '',
        date: '',
        time: '',
        numberOfGuests: 0,
        customer: {
            name: '',
            lastname: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        try {

            const response = await axios.get<IBookings[]>(
                `https://school-restaurant-api.azurewebsites.net/restaurant/65c6276ee125e85f5e15b79f`

            );
            setRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("customer.")) {
            setAddBooking(prevState => ({
                ...prevState,
                customer: {
                    ...prevState.customer,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            const newValue = name === 'numberOfGuests' ? parseInt(value) : value;
            setAddBooking(prevState => ({
                ...prevState,
                [name]: newValue
            }));
        }
    };

    const onSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
  
    if (!addBooking.date || !addBooking.time) {
        console.log("Please select date and time.");
        return;
    }

    axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", addBooking)
        .then((response) => {
            console.log('New booking created successfully:', response.data);
           
            setRestaurants(prevRestaurants => {
                const updatedRestaurants = [...prevRestaurants, response.data];
                
                console.log("Updated restaurants:", updatedRestaurants);
                
               
                const bookingsForSelectedDateAndTime = updatedRestaurants.filter(booking => booking.date === addBooking.date && booking.time === addBooking.time);
                console.log("Bookings for selected date and time:", bookingsForSelectedDateAndTime);
                
            
                if (bookingsForSelectedDateAndTime.length >= 2) {
                    console.log("Fully booked for the selected date and time.");
                }
                
                return updatedRestaurants;
            });
        })
        .catch((error) => {
            console.error('Error creating booking:', error);
        });
    }
    return (
        <div className="m-4 ">
            <h2 className='font-bold mb-2'>Gör en ny bokning</h2>
            <form action="" onSubmit={onSubmit}>
                <div>
                    <label className='m-4'>Restaurang</label>
                    <select
                        name="restaurantId"
                        value={addBooking.restaurantId}
                        onChange={handleInputChange}>
                    
                        <option value="">Välj Restaurang</option>
                        <option value="65c6276ee125e85f5e15b79f">Happy Dumpling</option>

                    </select>
                </div>


                <div>
                    <label className='m-4'>Datum</label>
                    <input
                        type="date"
                        placeholder="Add Date"
                        name="date"
                        value={addBooking.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className='m-4'>Sittning</label>
                    <select
                        name="time"
                        value={addBooking.time}
                        onChange={handleInputChange}
                    >
                        <option value="0">0</option>
                        <option value="18.00">18:00</option>
                        <option value="21.00">21:00</option>
                    </select>
                </div>
                <div>
                    <label className='m-4'>Antal</label>
                    <select
                        name="numberOfGuests"
                        value={addBooking.numberOfGuests}
                        onChange={handleInputChange}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div>
                    <label className='m-4'>Förnamn</label>
                    <input
                        type="text"
                        placeholder="Förnamn"
                        name="customer.name"
                        value={addBooking.customer.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className='m-4'>Efternamn</label>
                    <input
                        type="text"
                        placeholder="Efternamn"
                        name="customer.lastname"
                        value={addBooking.customer.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className='m-4'>Epost</label>
                    <input
                        type="text"
                        placeholder="Epost"
                        name="customer.email"
                        value={addBooking.customer.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className='m-4'>Mobil</label>
                    <input
                        type="text"
                        placeholder="Mobilnummer"
                        name="customer.phone"
                        value={addBooking.customer.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4" type="submit" value="Save Task">
                    Lägg till bokning
                </button>
                <br />
                {/* <Link to={`/booking/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4">See new booking</Link> */}
            <Link to={`/admin`} className="btn btn-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4">Tillbaka till admin</Link>
            </form>
        </div>
    );
};