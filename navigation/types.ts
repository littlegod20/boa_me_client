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
}

export type MessagesStackParamList = {
    Conversations: undefined
    Chat: { conversationId: string }
}

export type ProviderStackParamList = {
    Dashboard: undefined
    BookingDetail: {bookingId: string}
    MyServices: undefined
    Chat: {conversationId: string}
    Profile: undefined
}