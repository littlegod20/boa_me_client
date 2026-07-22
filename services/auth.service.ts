import api from "./api"
import { registerSchema } from "../validators/auth.validator"
import z from "zod"

export const loginUser = async (email:string, password:string) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

export const registerUser = async (data: z.infer<typeof registerSchema>) => {
    const response = await api.post('/auth/register', data)
    return response.data
}

export const verifyEmail = async (token:string) => {
    const response = await api.patch('auth/verify-email', {token})
    return response.data
}

export const forgotPassword = async (email:string) => {
    const response = await api.post('auth/forgot-password', {email})
    return response.data
}

export const resetPassword = async (token:string, password:string) => {
    const response = await api.post('auth/password-reset', {token, password})
    return response.data
}