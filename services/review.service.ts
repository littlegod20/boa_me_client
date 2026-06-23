import api from "./api"

export const createReview = async (input:{booking_id:string, rating:number, comment:string})=>{
    const result = await api.post(`/reviews`, input)
    return result.data
}

export const getReviews = async ()=>{
    const result = await api.get('/reviews')
    return result.data
}

// review.service.ts
export const getReviewById = async (reviewId: string) => {
    const result = await api.get(`/reviews/${reviewId}`)
    return result.data
}

