import axios from "axios"
import { API_BASE_URL } from "../constants/api"
import { useAuthStore } from "../store/authStore"


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// attaching token to every request automatically
api.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// handle 401 responses globally
api.interceptors.response.use(
    (response)=> response,
    async (error) => {
        if (error.response?.status === 401) {
            useAuthStore.persist.clearStorage()
            useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)

export default api