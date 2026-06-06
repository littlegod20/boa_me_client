type JwtPayload = {
    id: string
    name?: string
    email?: string
    role: 'customer' | 'provider' | 'admin'
}

export function parseJwtPayload(token: string): JwtPayload {
    const base64Url = token.split('.')[1]
    if (!base64Url) {
        throw new Error('Invalid token')
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    )

    return JSON.parse(jsonPayload) as JwtPayload
}
