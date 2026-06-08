import { Service } from "../types/service.types"
import api from "./api"


export const getAllServices = async (categoryId?: string, page?: number, limit?: number) => {
    const response = await api.get('/services', {
        params: {
            categoryId,
            page: page || 1,
            limit: limit || 10
        }
    })
    return response.data
}   

export const getServiceById = async (serviceId: string) => {
    const response = await api.get(`/services/${serviceId}`)
    return response.data
}

export const createService = async (service: Service) => {
    const response = await api.post('/services', service)
    return response.data
}

export const updateService = async (serviceId: string, service: Service) => {
    const response = await api.patch(`/services/${serviceId}`, service)
    return response.data
}

export const deleteService = async (serviceId: string) => {
    const response = await api.delete(`/services/${serviceId}`)
    return response.data
}
