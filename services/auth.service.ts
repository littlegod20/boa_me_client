import api from "./api"

export const loginUser = async (email:string, password:string) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

export const registerUser = async (name:string, email:string, password:string, role:string) => {
    const response = await api.post('/auth/register', {name, email, password, role})
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