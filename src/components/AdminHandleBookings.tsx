import { AllBookings } from "./AdminAllBookings";
import { AdminSearchBooking } from "./AdminSearchBooking";
import EditBooking from "./EditBookingTest";



export const AdminHandleBookings = () => {
    const restaurantId = "65c6276ee125e85f5e15b79f";

    return (
        <>
        <h1>Admin Bokningshantering</h1>
        <AllBookings />

        <AdminSearchBooking />

        <EditBooking bookingId={restaurantId} />

        </>
    )
}