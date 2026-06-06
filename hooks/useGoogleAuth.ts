import { useMutation } from '@tanstack/react-query'
import { signInWithGoogle } from '../services/googleAuth.service'
import { useAuthStore } from '../store/authStore'
import { parseJwtPayload } from '../utils/jwt'

export const useGoogleSignInMutation = () => {
    return useMutation({
        mutationFn: signInWithGoogle,
        onSuccess: (token) => {
            const user = parseJwtPayload(token)
            useAuthStore.getState().setAuth(token, {
                id: user.id,
                name: user.name ?? '',
                email: user.email ?? '',
                role: user.role,
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
