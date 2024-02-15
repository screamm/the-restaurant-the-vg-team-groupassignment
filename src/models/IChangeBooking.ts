export interface IBookingsRestaurantChangeBooking {
    id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerID: string,
}