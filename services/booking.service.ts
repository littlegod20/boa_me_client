import { CreateBookingInput } from "../types/booking.types"
import api from "./api"


export const createBooking = async (booking: CreateBookingInput) => {
    const response = await api.post('/bookings', booking)
    return response.data
}