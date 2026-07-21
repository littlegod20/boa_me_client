import { BookingsStackParamList } from './types'
import MyBookingsScreen from '../screens/customer/MyBookingsScreen'
import { createStackNavigator } from '@react-navigation/stack'
import BookingDetail from '../screens/customer/BookingDetail'
import ReviewScreen from '../screens/customer/ReviewScreen'
import ReviewBookingDetail from '../screens/customer/ReviewBookingDetail'

const Stack = createStackNavigator<BookingsStackParamList>()

export default function BookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />
      <Stack.Screen name="ReviewBooking" component={ReviewScreen} />
      <Stack.Screen name="ReviewDetail" component={ReviewBookingDetail} />
    </Stack.Navigator>
  )
}
