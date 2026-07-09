import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createConversation, getConversationMessages, getConversations } from "../services/conversation.service"
import { ConversationListItem, Message } from "../types/conversation.types"

export const useGetConversations = () => {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: getConversations,
        select: (data) => data.data as ConversationListItem[],
    })
}

export const useGetConversationMessages = (conversationId: string) => {
    return useQuery({
        queryKey: ['conversation-messages', conversationId],
        queryFn: () => getConversationMessages(conversationId),
        select: (data) => data.data as Message[],
        enabled: !!conversationId,
    })
}

export const useCreateConversation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: { booking_id?: string; provider_id: string }) => createConversation(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}
