import { create } from 'zustand'

type UnreadStore = {
    hasUnreadMessages: boolean
    activeConversationId: string | null
    setHasUnreadMessages: (value: boolean) => void
    setActiveConversationId: (id: string | null) => void
}

export const useUnreadStore = create<UnreadStore>((set) => ({
    hasUnreadMessages: false,
    activeConversationId: null,
    setHasUnreadMessages: (value) => set({ hasUnreadMessages: value }),
    setActiveConversationId: (id) => set({ activeConversationId: id }),
}))
