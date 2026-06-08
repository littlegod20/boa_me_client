import { useMutation } from "@tanstack/react-query"
import { createBooking } from "../services/booking.service"
import { CreateBookingInput } from "../types/booking.types"

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: (booking: CreateBookingInput) => createBooking(booking),
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}