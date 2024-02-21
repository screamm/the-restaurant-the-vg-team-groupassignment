export interface IBookingsRestaurantChangeBooking {
    _id: any;
    id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerID: string,
    customerName: string,
    customerLastname: string,
}