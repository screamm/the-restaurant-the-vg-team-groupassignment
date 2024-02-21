export interface IBookingRestaurant {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerId: string,    
    customerName: string,
    customerLastname: string
}