

import axios from "axios";
import React from "react";
import { IBookingsRestaurantChangeBooking } from "../models/IChangeBooking";

interface IEditBookingProps {
    bookingId: string;
}

interface IEditBookingState {
    date: string;
    time: string;
    numberOfGuests: number;
}


export class EditBooking extends React.Component<IEditBookingProps, IEditBookingState> {
    constructor(props: IEditBookingProps) {
        super(props);
        this.state = {
            date: '',
            time: '',
            numberOfGuests: 0
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`https://school-restaurant-api.azurewebsites.net/booking/${this.props.bookingId}`);
            const booking: IBookingsRestaurantChangeBooking = response.data;
            this.setState({
                date: booking.date,
                time: booking.time,
                numberOfGuests: booking.numberOfGuests
            });
        } catch (error) {
            console.error("Error fetching booking:", error);
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h2>Redigera bokning</h2>
                <form>
                    <label>
                        Datum:
                        <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                    </label>
                    <label>
                        Tid:
                        <input type="time" name="time" value={this.state.time} onChange={this.handleChange} />
                    </label>
                    <label>
                        Antal gäster:
                        <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={this.handleChange} />
                    </label>
                    <button type="submit">Uppdatera bokning</button>
                </form>
            </div>
        );
    }
}

export default EditBooking;

