import axios from "axios";
import { useEffect, useState } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
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
    
        // Check for existing bookings for the same time slot and restaurant
        const existingBookings = restaurants.filter(
          booking =>
            booking._id === addBooking._id &&
            booking.date === addBooking.date &&
            booking.time === addBooking.time
        );

        console.log("Existing bookings:", existingBookings);
    
        if (existingBookings.length >= 2) {
          alert("Sorry, this time slot is fully booked. Please choose a different time or date.");
          return;
        }



    
            const isConfirmed = window.confirm(
                `TACK FÖR DIN BOKNING!!
                Vi vill informera dig om att vi tar din integritet på allvar. Som en del av vår strävan att skydda dina personuppgifter och för att följa de nya reglerna enligt GDPR, har vi uppdaterat våra sekretesspolicyer.
                Genom att fortsätta boka bord hos oss, samtycker du till vår uppdaterade sekretesspolicy där vi tydligt förklarar hur vi samlar in, använder och skyddar dina personuppgifter. Vi försäkrar dig om att dina uppgifter endast används för att hantera din bokning och för att förbättra din upplevelse hos oss.
                Om du har några frågor eller funderingar angående hur vi hanterar dina personuppgifter, är du välkommen att kontakta oss.
                Tack för att du väljer att boka bord hos oss!
        
                Om du väljer "Cancel" kommer din bokning kommer att avbrytas.`
            );
        
            if (isConfirmed) {
                console.log("Booking confirmed");

             


    
        axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", addBooking)
            .then((response) => {
                console.log('New booking created successfully:', response.data);

                // Update restaurants state with the new booking
                setRestaurants(prevRestaurants => {
                    const updatedRestaurants = [...prevRestaurants, response.data];
                    return updatedRestaurants;


                });

                                      // Extract the id from the response data
                                      const newBookingId = response.data.insertedId;
                                    console.log("newBookingId", newBookingId);


                
                                      // Redirect to the booking page with the new id
                                      window.location.href = `/booking/${newBookingId}`;


                                    // return (
                                    //     <div>
                                    //         <p>{response.data.time}</p>
                                    //         <p>{newBookingId.time}</p>
                                    //     </div>
                                    // );
                                        
                                      

                        

            })
            .catch((error) => {
                console.error('Error creating booking:', error);
            });



    } else {
        console.log("Booking cancelled");
        return;
    }

};





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
                <button className="btn btn-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4" type="submit" value="Save Task">
                    Book a table
                </button>
                <br />
                {/* <Link to={`/booking/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4 ">Se din bokning här</Link> */}
            </form>
        </div>
    );
};
// useEffect(() => {
//     getAllBookings();
//   }, []);

//   const getAllBookings = async () => {
//     try {

//         const response = await axios.get(
//             `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`

//         );
        
//         setBookings(response.data);
//         setFilteredBookings([])
//     } catch (error) {
//         console.error("Error fetching restaurants:", error);
//     }
// };


     
  

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;
//     setSearchItem(searchTerm);

//     const filteredItems = bookings.filter((user) =>
//       user.date.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredUsers(filteredItems);
//     console.log('handlechange', searchTerm);
//   };

//   const handleDelete = async (customerId: string) => {
//     try {
//       const response = await axios.delete(
//         `https://school-restaurant-api.azurewebsites.net/booking/delete/${customerId}`
//       );
      
//       console.log(response.data);
//       setBookings(prevBookings => prevBookings.filter(booking => booking.customerId !== customerId));
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//     }
//   };

//   return (
//     <div>
//       <Link to={"/admin/add"}><button>Lägg till bokning</button></Link>
//       <br />
//       <label htmlFor="">Sök bokning på datum: </label>
//       <input
//         type="date"
//         name="date"
//         value={searchDate}
//         onChange={handleInputChange}
//       />


//       {filteredUsers.map((booking) => (
//         <>
//         <li key={booking.id}>
//           {booking.date}, {booking.customerId}
//         </li>
//         <button onClick={() => handleDelete(booking.customerId)}>Delete</button>
//         </>
//       ))}
//     </div>
//   );
// };
