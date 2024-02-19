import axios from "axios";
import { useEffect, useState } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";

import { IBookings } from "../models/IBookings";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";

export const BookingForm = () => {
    const { id } = useParams();
    const [restaurants, setRestaurants] = useState<IBookings[]>([]);
    const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);
    const [searchItem, setSearchItem] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchTime, setSearchTime] = useState('');

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

   
        
    
   useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {

        const response = await axios.get(
            `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`

        );
        console.log(response.data)
        setBookings(response.data);
        setFilteredBookings([])
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};


  

  const handleDateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = bookings.filter((user) =>
      user.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBookings(filteredItems);
    console.log('handlechange', filteredItems);

    if(filteredItems.length >= 2){
        console.log('datumet är fullbokat')
        alert("Datumet är fullbokat")
    }

    

  };
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredTime = filteredBookings.filter((user) =>
      user.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBookings(filteredTime);
    console.log('handlechangeTime', filteredTime);

    if(filteredTime.length >= 2){
        console.log('tiden är fullbokat')
        alert("Tiden är fullbokad")
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
           
        })
        .catch((error) => {
            console.error('Error creating booking:', error);
        });
    }
    return (
        <div className="m-4 border-8 border-pink-600">
            <h2>See free tables</h2>
            <input
            type="date"
            name="date"
            value={searchDate}
            onChange={handleDateChange}
            />
            <h2>see free times</h2>
            <select name="seeTime" value={searchTime} onChange={handleTimeChange}>
            <option value="">Select Time</option>
            <option value="18.00">18:00</option>
            <option value="21.00">21:00</option>
            </select>
            <h2>Make your reservation</h2>
            <form action="" onSubmit={onSubmit}>
                <div>
                    <label>Choose restaurant</label>
                    <select
                        name="restaurantId"
                        value={addBooking.restaurantId}
                        onChange={handleInputChange}>
                    
                        <option value="">Select Restaurant</option>
                        <option value="65c6276ee125e85f5e15b79f">Happy Dumpling</option>

                    </select>
                </div>


                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        placeholder="Add Date"
                        name="date"
                        value={addBooking.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Time</label>
                    <select
                        name="time"
                        value={addBooking.time}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Time</option>
                        <option value="18.00">18:00</option>
                        <option value="21.00">21:00</option>
                    </select>
                </div>
                <div>
                    <label>How many seats</label>
                    <select
                        name="numberOfGuests"
                        value={addBooking.numberOfGuests}
                        onChange={handleInputChange}
                    >
                        <option value="">Select seats</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="customer.name"
                        value={addBooking.customer.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>LastName</label>
                    <input
                        type="text"
                        placeholder="LastName"
                        name="customer.lastname"
                        value={addBooking.customer.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="customer.email"
                        value={addBooking.customer.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="Phone"
                        name="customer.phone"
                        value={addBooking.customer.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit" value="Save Task">
                    Book a table
                </button>
                <br />
                <Link to={`/booking/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Se din bokning här</Link>
            </form>
        </div>
    );
};
