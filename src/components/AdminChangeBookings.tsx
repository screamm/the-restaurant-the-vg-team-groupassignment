import { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { IBookingsRestaurantChangeBooking } from '../models/IChangeBooking';
 
export const AdminChangeBooking = ({ booking, updateBookingState }: { booking: IBookingsRestaurantChangeBooking, updateBookingState: (booking: IBookingsRestaurantChangeBooking) => void }) => {
    const [newDate, setNewDate] = useState(booking.date);
    const [newTime, setNewTime] = useState(booking.time);
    const [newNumberOfGuests, setNewNumberOfGuests] = useState(booking.numberOfGuests);
 
    const changeBooking = async (updatedBooking: IBookingsRestaurantChangeBooking) => {
        try {
            console.log('Startar uppdatering av bokning...');
            console.log('Uppdaterar bokning:', updatedBooking);
            const response = await axios.put(
                `https://school-restaurant-api.azurewebsites.net/booking/update/${updatedBooking.id}`,
                {
                    date: updatedBooking.date,
                    time: updatedBooking.time,
                    numberOfGuests: updatedBooking.numberOfGuests,
                    id: updatedBooking.id,
                    restaurantId: updatedBooking.restaurantId,
                    customerId: updatedBooking.customerId,
                }
            );
            console.log('Bokningen uppdaterades:', response.data);
            setNewDate(updatedBooking.date);
            setNewTime(updatedBooking.time);
            setNewNumberOfGuests(updatedBooking.numberOfGuests);
            updateBookingState(updatedBooking);
        } catch (error) {
            console.error('Update not possible', error);
        }
    };
 
    console.log('Renderar AdminChangeBooking-komponenten med bokning:', booking);
 
    return (
        <Popup trigger={<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4 ">Ändra</button>} position="right center">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', padding: '20px'}} >
                Namn: {booking.customerName} {booking.customerLastname}
                <input
                    type='date'
                    value={newDate}
                    onChange={(e) => {
                        console.log('Nytt datum valt:', e.target.value);
                        setNewDate(e.target.value);
                    }}
                />
                <select
                    value={newTime}
                    onChange={(e) => {
                        console.log('Ny tid vald:', e.target.value);
                        setNewTime(e.target.value);
                    }}
                >
                    <option value='18:00'>18:00</option>
                    <option value='21:00'>21:00</option>
                </select>
                <input
                    type='number'
                    value={newNumberOfGuests}
                    onChange={(e) => {
                        console.log('Nytt antal gäster valt:', e.target.value);
                        setNewNumberOfGuests(parseInt(e.target.value));
                    }}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded " onClick={() => {
                    console.log('Sparaknappen klickad, startar uppdatering...');
                    changeBooking({
                        date: newDate,
                        time: newTime,
                        numberOfGuests: newNumberOfGuests,
                        id: booking._id,
                        restaurantId: booking.restaurantId,
                        customerId: booking.customerId,
                        customerName: booking.customerName,
                        customerLastname: booking.customerLastname,
                        _id: booking._id
                    });
                }}>Spara</button>
            </div>
        </Popup>
    );
};
 

