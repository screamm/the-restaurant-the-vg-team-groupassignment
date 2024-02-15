
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';




export const AdminChangeBooking = () => {
    const changeBooking = async () => {
    const response = await axios.get(
      `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
    );
    };

    return (
        <Popup trigger={<button>Ändra</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    )
}

