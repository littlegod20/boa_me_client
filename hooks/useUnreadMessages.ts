import { useEffect } from 'react'
import { useSocket } from '../context/SocketContext'
import { useAuthStore } from '../store/authStore'
import { useUnreadStore } from '../store/unreadStore'
import { Message } from '../types/conversation.types'
import { useGetConversations, useMarkConversationRead } from './useConversations'

export function useUnreadMessagesListener() {
    const { socket } = useSocket()
    const currentUserId = useAuthStore((state) => state.user?.id)
    const { mutate: markRead } = useMarkConversationRead()

    useEffect(() => {
        if (!socket) return

        const handleNewMessage = (message: Message) => {
            if (message.sender_id === currentUserId) return

            const { activeConversationId, setHasUnreadMessages } = useUnreadStore.getState()
            if (message.conversation_id === activeConversationId) {
                markRead(activeConversationId)
                return
            }

            setHasUnreadMessages(true)
        }

        socket.on('new_message', handleNewMessage)
        return () => {
            socket.off('new_message', handleNewMessage)
        }
    }, [socket, currentUserId])
}

export function useSyncUnreadFromConversations() {
    const { data: conversations } = useGetConversations()
    useEffect(() => {
        if (!conversations) return
        const hasUnread = conversations.some((c) => (c.unread_count ?? 0) > 0)
        console.log('hasUnread:', hasUnread)
        useUnreadStore.getState().setHasUnreadMessages(hasUnread)
    }, [conversations])
}