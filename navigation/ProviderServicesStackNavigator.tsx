import { createStackNavigator } from '@react-navigation/stack'
import MyServices from '../screens/provider/MyServices'
import { ProviderServicesStackParamList } from './types'
import AddService from '../screens/provider/AddService'
import EditService from '../screens/provider/EditService'

const Stack = createStackNavigator<ProviderServicesStackParamList>()

export default function ProviderServicesStackNavigator() {
  return (  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MyServices' component={MyServices} />
      <Stack.Screen name='AddService' component={AddService} />
      <Stack.Screen name='EditService' component={EditService} />
    </Stack.Navigator>
  )
}
