import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {useAuthStore} from '../store/authStore'
import AuthNavigator from './AuthNavigator'
import ProviderNavigator from './ProviderNavigator'
import CustomerNavigator from './CustomerNavigator'


const Stack = createStackNavigator()

export default function RootNavigator () {
    const {token, user} = useAuthStore()
    
  return (
    <NavigationContainer>
        {
            !token ? (
                <AuthNavigator/>
            ): user?.role === 'provider' ? (
                <ProviderNavigator/>
            ): (
                <CustomerNavigator/>
            )
        }
    </NavigationContainer>
  )
}
