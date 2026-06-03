export type AuthStackParamList = {
    Login: undefined
    Register: undefined
    VerifyEmail: {email: string}
}

export type CustomerStackParamList = {
    Home: undefined
    ServiceProviders: {serviceId: string}
    BookService: {providerServiceId: string}
    MyBookings: undefined
    BookingDetail: {bookingId: string}
    Chat: {conversationId: string}
    Profile: undefined
}

export type ProviderStackParamList = {
    Dashboard: undefined
    BookingDetail: {bookingId: string}
    MyServices: undefined
    Chat: {conversationId: string}
    Profile: undefined
}