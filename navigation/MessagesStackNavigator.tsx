import { createStackNavigator } from '@react-navigation/stack'
import { MessagesStackParamList } from './types'
import ConversationsScreen from '../screens/customer/ConversationsScreen'

const Stack = createStackNavigator<MessagesStackParamList>()

export default function MessagesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Conversations" component={ConversationsScreen} />
    </Stack.Navigator>
  )
}
