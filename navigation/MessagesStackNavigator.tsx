import { createStackNavigator } from '@react-navigation/stack'
import { MessagesStackParamList } from './types'
import ChatScreen from '../screens/customer/ChatScreen'

const Stack = createStackNavigator<MessagesStackParamList>()

export default function MessagesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Conversations' component={ChatScreen} />
    </Stack.Navigator>
  )
}
