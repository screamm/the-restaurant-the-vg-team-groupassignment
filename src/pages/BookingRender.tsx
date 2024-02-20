import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


interface BookingData {
    numberOfGuests: number;
    date: string;
    time: string;
    
}
export const BookingRender = () => {
    const { id } = useParams<string>();
    const [bookingData, setBookingData] = useState<BookingData>();

    useEffect(() => {
        if (id) {
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

    console.log('BookingData', bookingData)
   

    return (
        <>
            <div>
            {bookingData ? (
                <div>
                    Ditt bokningsId {id}
                    <p>Guests: {bookingData.numberOfGuests}</p>
                    <p>Date: {bookingData.date}</p>
                    <p>Time: {bookingData.time}</p>
                    
                </div>
            ) : (
                <div>No booking data found</div>
            )}
            </div>
        
        </>
    );};

    