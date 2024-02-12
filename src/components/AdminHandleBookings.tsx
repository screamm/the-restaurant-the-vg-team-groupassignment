import { AllBookings } from "./AdminAllBookings";

export const AdminHandleBooking = () => {
    const restaurantId = "65c6276ee125e85f5e15b79f";

    return (
        <>
        <h1>Admin Bokningshantering</h1>
        <AllBookings restaurantId={restaurantId} />
        </>
    )
}

