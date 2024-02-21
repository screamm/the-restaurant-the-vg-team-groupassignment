export interface IBookingUpdate {
    _id: string;
    id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerID: string,
    customerName: string,
    customerLastname: string,
}