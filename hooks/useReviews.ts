import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createReview, getReviewById } from "../services/review.service"


export const useCreateReviews = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input:{booking_id:string, rating:number, comment:string})=>createReview(input),
        onSuccess:(_, variables)=>{
            queryClient.invalidateQueries({queryKey:['booking', variables.booking_id]})
        }
    })
}

// useReviews.ts
export const useGetReviewById = (reviewId: string) => {
    return useQuery({
        queryKey: ['review', reviewId],
        queryFn: () => getReviewById(reviewId),
        select: (data) => data.data,
        enabled: !!reviewId,
    })
}