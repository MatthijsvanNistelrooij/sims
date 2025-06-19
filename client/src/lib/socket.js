import { io } from "socket.io-client"
import { atom } from "jotai"

// export const socket = io("http://localhost:3001/")
export const socket = io("https://sims-es13.onrender.com/")

export const charactersAtom = atom([])
