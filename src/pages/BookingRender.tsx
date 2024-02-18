import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export const BookingRender = () => {
    const { id } = useParams<any>();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        if (_id) {
            axios
                .get(`https://school-restaurant-api.azurewebsites.net/booking/${id}`)
                .then((response) => {
                    console.log('Get Booking', response.data);
                    setBookingData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching booking:', error);
                });
        }
    }, [id]);

    return (
        <>
            <div>
            {bookingData ? (
                <div>
                    Ditt bokningsId {id}
                    {/* Render booking data here */}
                </div>
            ) : (
                <div>No booking data found</div>
            )}
            </div>
            <div>

                <input type="text" placeholder="Skriv in ditt bokningsId" />          

                <button type="submit" onClick={BookingRender}>Hämta bokning</button>
               
            </div>
        </>
    );};

    