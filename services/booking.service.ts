import { CreateBookingInput } from "../types/booking.types"
import api from "./api"


export const getBookings = async () => {
    const response = await api.get('/bookings')
    return response.data
}

export const createBooking = async (booking: CreateBookingInput) => {
    const response = await api.post('/bookings', booking)
    return response.data
}

export const findBookingById = async (bookingId: string) => {
    const response = await api.get(`/bookings/${bookingId}`)
    return response.data
}