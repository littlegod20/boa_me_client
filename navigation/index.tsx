import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {useAuthStore} from '../store/authStore'
import AuthNavigator from './AuthNavigator'
import ProviderNavigator from './ProviderNavigator'
import CustomerNavigator from './CustomerNavigator'
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const linking = {
    prefixes: [prefix, 'boame://'],
    config: {
        screens: {
            Auth:{
                path: 'auth',
                screens: {
                    Login: 'login',
                    Register: 'register',
                    VerifyEmail: 'verify-email'
                }
            },
        }
    }
}

const Stack = createStackNavigator()

export default function RootNavigator () {
    const {token, user} = useAuthStore()

    return (
    <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : user?.role === 'provider' ? (
                <Stack.Screen name="Provider" component={ProviderNavigator} />
            ) : (
                <Stack.Screen name="Customer" component={CustomerNavigator} />
            )}
        </Stack.Navigator>
    </NavigationContainer>
    )
}
