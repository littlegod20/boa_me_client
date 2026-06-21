import { BookingsStackParamList } from './types'
import MyBookingsScreen from '../screens/customer/MyBookingsScreen'
import { createStackNavigator } from '@react-navigation/stack'
import BookingDetail from '../screens/customer/BookingDetail'

const Stack = createStackNavigator<BookingsStackParamList>()

export default function BookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='MyBookings' component={MyBookingsScreen} />
      <Stack.Screen name='BookingDetail' component={BookingDetail} />
    </Stack.Navigator>
  )
}