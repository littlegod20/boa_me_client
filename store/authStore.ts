import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
    id: string
    name: string
    email: string
    role: 'customer' | 'provider' | 'admin'
}


type AuthStore = {
    token: string | null
    user: User | null
    setAuth: (token: string, user: User) => void
    logout: () => void
}

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