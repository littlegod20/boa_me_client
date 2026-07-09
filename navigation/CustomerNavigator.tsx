import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomerTabParamList } from "./types";
import HomeStackNavigator from "./HomeStackNavigator";
import BookingsStackNavigator from "./BookingsStackNavigator";
import MessagesStackNavigator from "./MessagesStackNavigator";
import { BookMinus, Home, MessageCircle } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../constants/theme";
import { ProfileStackNavigator } from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator<CustomerTabParamList>()

export default function CustomerNavigator() {
    const {colors} = useTheme()
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: 110,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: fonts.medium,
                    textAlign: 'center'
                }
            }}>
            <Tab.Screen name='HomeTab' component={HomeStackNavigator} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Home color={color} size={size} />
                )
            }} />
            <Tab.Screen name='BookingsTab' component={BookingsStackNavigator} options={{
                tabBarLabel: 'Bookings',
                tabBarIcon: ({color, size}) => (
                    <BookMinus color={color} size={size} />
                )
            }} />
            <Tab.Screen name='MessagesTab' component={MessagesStackNavigator} options={{
                tabBarLabel: 'Messages',
                tabBarIcon: ({color, size}) => (
                    <MessageCircle color={color} size={size} />
                )
            }} />
            <Tab.Screen name='ProfileTab' component={ProfileStackNavigator} options={{
                tabBarButton: () => null,
                tabBarItemStyle: { display: 'none' },
            }} />
        </Tab.Navigator>
    )
}
