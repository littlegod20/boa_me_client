import { createStackNavigator } from '@react-navigation/stack'
import ProviderBookingDetailScreen from '../screens/provider/ProviderBookingDetailScreen'
import ProviderBookingsScreen from '../screens/provider/ProviderBookingsScreen'
import { ProviderBookingsStackParamList } from './types'

const Stack = createStackNavigator<ProviderBookingsStackParamList>()

export default function ProviderBookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='ProviderBookings' component={ProviderBookingsScreen} />
      <Stack.Screen name='ProviderBookingDetail' component={ProviderBookingDetailScreen} />
    </Stack.Navigator>
  )
}