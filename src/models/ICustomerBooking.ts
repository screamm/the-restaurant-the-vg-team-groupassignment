export interface ICustomerBooking {
    restaurantID: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customer: {
        name: string,
        lastname: string,
        email: string,
        phone: string
    }
}