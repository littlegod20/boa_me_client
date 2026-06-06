import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

const GOOGLE_REDIRECT_URI = 'boame://auth/callback'

export async function signInWithGoogle(): Promise<string> {
    const authUrl = `https://drinking-omega-answering.ngrok-free.dev/api/v1/auth/google`
    
    const result = await WebBrowser.openAuthSessionAsync(authUrl, GOOGLE_REDIRECT_URI)

    if (result.type !== 'success' || !result.url) {
        throw new Error('Google sign-in was cancelled or failed')
    }

    const { queryParams } = Linking.parse(result.url)
    const token = queryParams?.token

    if (typeof token !== 'string' || !token) {
        throw new Error('No token received')
    }

    return token
}
