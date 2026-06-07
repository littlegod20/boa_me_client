import api from "./api"


export const getAllCategories = async () => {
    const response = await api.get('/categories')
    return response.data
}

export const getCategoryById = async (id: string) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
}

export const createCategory = async (name: string, description: string) => {
    const response = await api.post('/categories', {name, description})
    return response.data
}

export const updateCategory = async (id: string, name: string, description: string) => {
    const response = await api.patch(`/categories/${id}`, {name, description})
    return response.data
}

export const deleteCategory = async (id: string) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
}