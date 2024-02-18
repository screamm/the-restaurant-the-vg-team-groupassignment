import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";

export const AdminDeleteBooking = ({ booking }: { booking: any }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `https://school-restaurant-api.azurewebsites.net/booking/delete/${booking._id}`
            );
            console.log('Bokning har raderast:', response.data);
        } catch (error) {
            console.error('Gick ej att redara bokning:', error);
        }
    };

    const handleClose = () => {
    // detta är inte klart...
    }

    return (
        <Popup trigger={<button>Radera</button>} position="right center">
            <div>
                <p>Är du säker på att du vill radera bokningen?</p>
                <button onClick={() => { handleDelete()}}>JA</button>
                <button onClick={handleClose}>NEJ</button>
            </div>
        </Popup>
    );
} 