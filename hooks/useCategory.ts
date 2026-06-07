import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category.service"



export const useFetchCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
        select: (data) => data.data
    })
}

export const useGetCategoryById = (id: string) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
        select: (data) => data.data
    })
}


export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({name, description}: {name: string, description: string}) => createCategory(name, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, name, description}: {id: string, name: string, description: string}) => updateCategory(id, name, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}