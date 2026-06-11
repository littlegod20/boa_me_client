export enum BookingStatus {
    PENDING_PAYMENT = 'pending_payment',
    PENDING_CONFIRMATION = 'pending_confirmation',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export interface Booking {
    id: string
    customer_id: string
    provider_service_id: string
    scheduled_at: string
    booking_status: BookingStatus
    customer_location: string
    customer_latitude?: number
    customer_longitude?: number
    created_at: Date
    updated_at: Date
}

export type CreateBookingInput = {
    provider_service_id: string
    scheduled_at: Date
    customer_location: string
    customer_latitude?: number
    customer_longitude?: number
}