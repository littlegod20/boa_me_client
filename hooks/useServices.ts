import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../services/service.service"
import { Service } from "../types/service.types"


export const useGetAllServices = (categoryId?: string, page?: number, limit?: number)=> {
    return useQuery({
        queryKey: ['services',categoryId, page, limit],
        queryFn: ()=> getAllServices(categoryId, page, limit),
        select: (data) => data.data
    })
}

export const useGetServiceById = (serviceId:string) => {
    return useQuery({
        queryKey: ['service', serviceId],
        queryFn: ()=> getServiceById(serviceId),
        select: (data) => data.data
    })
}

export const useCreateService = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (service:Service) => createService(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}


export const useUpdateService = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({serviceId, service}:{serviceId:string, service:Service}) => updateService(serviceId, service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useDeleteService = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (serviceId:string)=>deleteService(serviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}