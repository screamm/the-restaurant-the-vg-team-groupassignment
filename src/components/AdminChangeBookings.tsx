import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { useState } from 'react';
import { IBookingsRestaurantChangeBooking } from '../models/IChangeBooking';

export const AdminChangeBooking = ({ booking }: { booking: IBookingsRestaurantChangeBooking }) => {
    const [newDate, setNewDate] = useState(booking.date);
    const [newTime, setNewTime] = useState(booking.time);
    const [newNumberOfGuests, setNewNumberOfGuests] = useState(booking.numberOfGuests);

    const changeBooking = async () => {
        try {
            console.log('Startar uppdatering av bokning...');
            const response = await axios.put(
                `https://school-restaurant-api.azurewebsites.net/booking/update/${updatedbooking._id}`,
                {
                    date: updatedBooking.date,
                    time: updatedBooking.time,
                    numberOfGuests: updatedBooking.numberOfGuests,
                    id: booking._id
                }
            );
            console.log('Bokningen uppdaterades:', response.data);
        } catch (error) {
            console.error('Gick ej att uppdatera:', error);
        }
    };

    console.log('Renderar AdminChangeBooking-komponenten med bokning:', booking);

    return (
        <Popup trigger={<button>Ändra</button>} position="right center">
            <div>
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
                <button onClick={() => {
                    console.log('Sparaknappen klickad, startar uppdatering...');
                    changeBooking({
                        date: newDate,
                        time: newTime,
                        newNumberOfGuests: newNumberOfGuests,
                        id: booking._id
                    });
                }}>Spara</button>
            </div>
        </Popup>
    );
};

