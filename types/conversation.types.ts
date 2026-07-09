export interface Conversation {
    id: string
    booking_id?: string | null
    customer_id: string
    provider_id: string
    last_message?: string | null
    last_message_at?: string | null
    created_at: string
    updated_at: string
}

export interface ConversationListItem extends Conversation {
    customer_name: string | null
    customer_profile: string | null
    provider_name: string | null
    provider_profile: string | null
    last_message:string
}

export interface Message {
    id: string
    content: string
    conversation_id: string
    sender_id: string
    is_edited: boolean
    is_seen: boolean
    timestamp: string
    created_at: string
    updated_at: string
}
