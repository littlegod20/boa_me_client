import { createProviderService, deleteProviderService, getProviderServiceById, getProviderServices, getServiceProviders, registerAsProvider, updateProviderService } from "../services/provider.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { CreateProvider, ProviderServiceDetailed } from "../types/provider.types"
import { parseJwtPayload } from "../utils/jwt"

export const useGetServiceProviders = (serviceId: string, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ['service-providers', serviceId, page, limit],
        queryFn: ()=> getServiceProviders(serviceId, page, limit),
        select: (data) => data.data
    })
}

export const useGetProviderServiceById = (providerServiceId: string) => {
    return useQuery({
        queryKey: ['provider', providerServiceId],
        queryFn: ()=> getProviderServiceById(providerServiceId),
        select: (data) => data.data
    })
}

export const useGetProviderServices = ( page?: number, limit?: number) => {
    return useQuery({
        queryKey: ['provider-services', page, limit],
        queryFn: ()=> getProviderServices(page, limit),
        select: (data) => data.data as ProviderServiceDetailed[]
    })
}

export const useCreateProviderService = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({serviceId, price}: {serviceId: string, price: number}) => createProviderService(serviceId, price),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useUpdateProviderService = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({providerServiceId, price}: {providerServiceId: string, price: number}) => updateProviderService(providerServiceId, price),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useDeleteProviderService = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (providerServiceId: string) => deleteProviderService(providerServiceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

// useProviders.ts
export const useRegisterAsProvider = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    return useMutation({
        mutationFn: (data: CreateProvider) => registerAsProvider(data),
        onSuccess: (response) => {
            const token = response.token
            const user = parseJwtPayload(token)
            setAuth(token, user)
        },
    })
}