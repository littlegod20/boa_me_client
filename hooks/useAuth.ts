import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser } from "../services/auth.service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuthStore } from "../store/authStore"
import { registerSchema } from "../validators/auth.validator"
import z from "zod"

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: ({email, password}: {email: string, password: string}) => loginUser(email, password),
        onSuccess: (data) => {
            AsyncStorage.setItem('token', data.token)
            useAuthStore.getState().setAuth(data.token, data.user)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: ({ name, email, password, role, phone_number }: z.infer<typeof registerSchema>) =>
            registerUser(name, email, password, role, phone_number),
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}