export interface IBookingsRestaurantChangeBooking {
    _id: string;
    id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerId: string,
    customerName: string,
    customerLastname: string,
}