import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '../store/authStore'
import {SOCKET_BASE_URL} from '../constants/api'

type SocketContextType = {
    socket: Socket | null
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false })

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: { children: ReactNode }) {
    const token = useAuthStore((state) => state.token)
    const socketRef = useRef<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (!token) {
            // no token — ensure disconnected
            socketRef.current?.disconnect()
            socketRef.current = null
            setIsConnected(false)
            return
        }

        const socket = io(SOCKET_BASE_URL, {
            auth: { token },
            transports: ['websocket'],
        })
        socketRef.current = socket

        socket.on('connect', () => setIsConnected(true))
        socket.on('disconnect', () => setIsConnected(false))
        socket.on('connect_error', (err) => console.log('socket error:', err.message))

        return () => {
            socket.disconnect()
            socketRef.current = null
        }
    }, [token])

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}