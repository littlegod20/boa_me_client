import { useMutation, useQuery } from "@tanstack/react-query"
import { createBooking, findBookingById, getBookings } from "../services/booking.service"
import { CreateBookingInput } from "../types/booking.types"


export const useGetBookings = () => {
    return useQuery({
        queryKey: ['bookings'],
        queryFn: () => getBookings(),
        select: (data) => data.data
    })
}

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: async (booking: CreateBookingInput) => await createBooking(booking),
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useFindBookingById = (bookingId: string) => {
    return useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => findBookingById(bookingId),
        select: (data) => data.data,
        enabled: !!bookingId
    })
}