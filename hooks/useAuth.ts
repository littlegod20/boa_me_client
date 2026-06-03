import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../services/auth.service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuthStore } from "../store/authStore"


export const useLoginMutation = () => {
    return useMutation({
        mutationFn: ({email, password}: {email: string, password: string}) => loginUser(email, password),
        onSuccess: (data) => {
            console.log(data)
            AsyncStorage.setItem('token', data.token)
            useAuthStore.getState().setAuth(data.token, data.user)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}