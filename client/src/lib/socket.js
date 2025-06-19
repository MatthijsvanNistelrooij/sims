import { io } from "socket.io-client"
import { atom } from "jotai"

const socketUrl = import.meta.env.VITE_SOCKET_URL

export const socket = io(socketUrl)
export const charactersAtom = atom([])
