import { io } from "socket.io-client"
import { atom } from "jotai"

const socketUrl = import.meta.env.VITE_SOCKET_URL

export const socket = io(socketUrl, {
  transports: ["websocket"], // Ensure it uses WebSocket protocol
  forceNew: true, // ✅ Force a new connection for every tab
})

export const charactersAtom = atom([])
