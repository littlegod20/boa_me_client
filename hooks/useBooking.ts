import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { changeBookingStatus, createBooking, findBookingById, getBookings } from "../services/booking.service"
import { Booking, BookingStatus, CreateBookingInput } from "../types/booking.types"


export const useGetBookings = () => {
    return useQuery({
        queryKey: ['bookings'],
        queryFn: () => getBookings(),
        select: (data) => data.data
    })
}

export const useGetProviderBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'provider'],
        queryFn: () => getBookings('provider'),
        select: (data) => data.data
    })
}

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

export const useGetBookingById = (bookingId: string) => {
    return useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => findBookingById(bookingId),
        select: (data) => data.data as Booking,
        enabled: !!bookingId
    })
}

export const useChangeBookingStatus = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({bookingId, booking_status}:{bookingId:string, booking_status:BookingStatus}) => changeBookingStatus(bookingId, booking_status),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['bookings']})
            queryClient.invalidateQueries({queryKey: ['booking']})
        },
        onError: (error) =>{
            console.log(error)
        }
    })
}