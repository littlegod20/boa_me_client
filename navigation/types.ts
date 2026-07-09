export type AuthStackParamList = {
    Login: undefined
    Register: undefined
    VerifyEmail: {email: string}
}

export type CustomerTabParamList = {
    HomeTab: undefined
    BookingsTab: undefined
    MessagesTab: undefined
    ProfileTab: undefined
}

export type HomeStackParamList = {
    Home: undefined
    Services: {categoryId: string, categoryName: string}
    ServiceProviders: {serviceId: string, serviceName: string}
    BookService: {providerServiceId: string}
}

export type BookingsStackParamList = {
    MyBookings: undefined
    BookingDetail: { bookingId: string }
    Chat: {conversationId:string, otherName?:string}
    ReviewBooking: {bookingId: string, serviceName?: string, providerName?: string}
    ReviewDetail: { reviewId: string }
}

export type ProfileStackParamList = {
    Profile:undefined
    BecomeAProvider:undefined
}

export type MessagesStackParamList = {
    Conversations: undefined
    Chat: { conversationId: string, otherName?: string }
}

export type ProviderTabParamList = {
    BookingsTab: undefined
    ServicesTab: undefined
    EarningsTab: undefined
    MessagesTab: undefined
    ProfileTab: undefined
}

export type ProviderBookingsStackParamList = {
    ProviderBookings: undefined
    ProviderBookingDetail: { bookingId: string }
}

export type ProviderServicesStackParamList = {
    MyServices: undefined
    AddService: undefined
    EditService: { providerServiceId: string, serviceName?: string, price?: number }
}