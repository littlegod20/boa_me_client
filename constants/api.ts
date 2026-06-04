// export const API_BASE_URL = 'http://188.166.168.9/api/v1'
// export const SOCKET_URL = 'http://188.166.168.9'
console.log("API_URL", process.env.EXPO_PUBLIC_API_URL)
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL
export const SOCKET_BASE_URL = process.env.EXPO_PUBLIC_SOCKET_URL