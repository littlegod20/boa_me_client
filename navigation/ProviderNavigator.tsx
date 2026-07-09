import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LayoutDashboardIcon, Wallet, Wrench, MessageCircle } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../constants/theme";
import ProviderBookingsStackNavigator from "./ProviderBookingsStackNavigator";
import { ProviderTabParamList } from "./types";
import { ProfileStackNavigator } from "./ProfileStackNavigator";
import Earnings from "../screens/provider/Earnings";
import ProviderServicesStackNavigator from "./ProviderServicesStackNavigator";
import MessagesStackNavigator from "./MessagesStackNavigator";

const Tab = createBottomTabNavigator<ProviderTabParamList>()

export default function ProviderNavigator() {
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
            }}
        >
            <Tab.Screen name="BookingsTab" component={ProviderBookingsStackNavigator} options={{
                tabBarLabel:'Dashboard',
                tabBarIcon:({color, size})=>(
                    <LayoutDashboardIcon color={color} size={size} />
                )
            }}/>

             <Tab.Screen name="ServicesTab" component={ProviderServicesStackNavigator} options={{
                tabBarLabel:'Services',
                tabBarIcon:({color, size})=>(
                    <Wrench color={color} size={size} />
                )
            }}/>

             <Tab.Screen name="EarningsTab" component={Earnings} options={{
                tabBarLabel:'Earnings',
                tabBarIcon:({color, size})=>(
                    <Wallet color={color} size={size} />
                )
            }}/>

             <Tab.Screen name="MessagesTab" component={MessagesStackNavigator} options={{
                tabBarLabel:'Messages',
                tabBarIcon:({color, size})=>(
                    <MessageCircle color={color} size={size} />
                )
            }}/>
            
            <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{
                tabBarButton: () => null,
                tabBarItemStyle: { display: 'none' },
            }}/>

        </Tab.Navigator>
    )
}
