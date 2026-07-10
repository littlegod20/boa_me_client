import api from "./api"


export const getConversations = async () => {
    const response = await api.get('/conversations')
    return response.data
}

export const getConversationMessages = async (conversationId: string) => {
    const response = await api.get(`/conversations/${conversationId}/messages`)
    return response.data
}

export const createConversation = async (input: { booking_id?: string, provider_id: string }) => {
    const response = await api.post('/conversations', input)
    return response.data
}

export const markConversationRead = async (conversationId: string) => {
    const response = await api.patch(`/conversations/${conversationId}/read`)
    return response.data
}