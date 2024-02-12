import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export const Booking = () => {
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios
                .get(`https://school-restaurant-api.azurewebsites.net/booking/${id}`)
                .then((response) => {
                    console.log('Get Booking', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching booking:', error);
                });
        }
    }, [id]);

    return (
        <>
            <div>
                Booking {id}
            </div>
        </>
    );};