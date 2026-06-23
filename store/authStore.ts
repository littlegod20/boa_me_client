import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthStore } from '../types/auth.types'



export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({token, user}),
            logout: () => set({token: null, user: null})
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)