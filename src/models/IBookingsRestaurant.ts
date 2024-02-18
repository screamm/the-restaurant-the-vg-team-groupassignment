export interface IBookingsRestaurant {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerId: string,    
    customerName: string,
    customerLastname: string
}