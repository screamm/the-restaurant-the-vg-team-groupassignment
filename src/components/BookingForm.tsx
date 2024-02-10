import { ChangeEvent, SyntheticEvent, useState } from "react"

export const BookingForm = () => {

    const [addBooking, setAddBooking] = useState({restaurantID: '',
        date: '',
        time: '',
        numberOfGuests: 0,
        customer: {
            name: '',
            lastname: '',
            email: '',
            phone: ''
        }})
    
        const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            if (name.startsWith("customer.")) {
                // If it's a nested property of customer object
                setAddBooking(prevState => ({
                    ...prevState,
                    customer: {
                        ...prevState.customer,
                        [name.split('.')[1]]: value
                    }
                }));
            } else {
                // If it's a top-level property
                setAddBooking(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };
    const onSubmit = (e:  SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()
        console.log(addBooking)  
    }

    return(
        <>
        <div>Make your reservation</div>
        <form action="" onSubmit={onSubmit}>
        <div>
            <label>RestaurantID: 65c6276ee125e85f5e15b79f</label>
            <input 
            type="text" 
            placeholder="Add ID"
            name="restaurantID"
            value={addBooking.restaurantID}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Date</label>
            <input 
            type="date" 
            placeholder="Add Date"
            name="date"
            value={addBooking.date}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Time</label>
            <select
            name="time"
            value={addBooking.time}
            onChange={handleInputChange}>
                <option value="18.00">18:00</option>
                <option value="21.00">21:00</option>
            </select>
        </div>
        <div>
            <label>How many seats</label>
            <select
            name="numberOfGuests"
            value={addBooking.numberOfGuests}
            onChange={handleInputChange}>
                <option value="0">0</option>
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
            onChange={handleInputChange} />
        </div>
        <div>
            <label>LastName</label>
            <input 
            type="text" 
            placeholder="LastName"
            name="customer.lastname"
            value={addBooking.customer.lastname}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Email</label>
            <input 
            type="text" 
            placeholder="Email"
            name="customer.email"
            value={addBooking.customer.email}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Phone</label>
            <input 
            type="text" 
            placeholder="Phone"
            name="customer.phone"
            value={addBooking.customer.phone}
            onChange={handleInputChange} />
        </div>
        <input 
        className="btn btn-block" 
        type="submit" 
        value="Save Task" />
        </form>
        </>
    )
}