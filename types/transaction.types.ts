export enum TransactionType {
    PAYOUT = 'payout',
    PAYIN = 'payin',
    REFUND = 'refund',
}

export enum TransactionStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export interface ProviderTransaction {
    id: string
    booking_id: string
    customer_user_id: string
    provider_user_id: string
    payment_id: string
    amount: number
    transaction_type: TransactionType
    transaction_status: TransactionStatus
    created_at: string
    updated_at: string
    service_name: string | null
    customer_name: string | null
}

export interface ProviderEarnings {
    totalEarned: number
    pending: number
    transactions: ProviderTransaction[]
}
