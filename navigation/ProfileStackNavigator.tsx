import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/customer/ProfileScreen";
import BecomeAProvider from "../screens/customer/BecomeAProvider";
import { ProfileStackParamList } from "./types";


const Stack = createStackNavigator<ProfileStackParamList>()

export function ProfileStackNavigator (){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="BecomeAProvider" component={BecomeAProvider} />
        </Stack.Navigator>
    )
}