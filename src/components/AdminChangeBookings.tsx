import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { useState } from 'react';
import { ChangeBooking } from '../models/IChangeBooking';

export const AdminChangeBooking = ({ booking }: { booking: ChangeBooking }) => {
    const [newDate, setNewDate] = useState(booking.date);
    const [newTime, setNewTime] = useState(booking.time);
    const [newNumberOfGuests, setNewNumberOfGuests] = useState(booking.numberOfGuests);

    const changeBooking = async () => {
        try {
            const response = await axios.put(
                `https://school-restaurant-api.azurewebsites.net/booking/update/${booking._id}`,
                {
                    date: newDate,
                    time: newTime,
                    numberOfGuests: newNumberOfGuests
                }
            );
            console.log('Bokningen uppdaterades:', response.data);
        } catch (error) {
            console.error('Gick ej att uppdatera:', error);
        }
    };

    return (
        <Popup trigger={<button>Ändra</button>} position="right center">
            <div>
                Namn: {booking.customerName} {booking.customerLastname}
                <input
                    type='date'
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                >
                    <option value='18:00'>18:00</option>
                    <option value='21:00'>21:00</option>
                </select>
                <input
                    type='number'
                    value={newNumberOfGuests}
                    onChange={(e) => setNewNumberOfGuests(parseInt(e.target.value))}
                />
                <button onClick={changeBooking}>Spara</button>
            </div>
        </Popup>
    );
};