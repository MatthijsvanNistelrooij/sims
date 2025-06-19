import { useEffect } from "react"
import { charactersAtom, socket } from "../lib/socket"
import { useAtom } from "jotai"

export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom)

  console.log(_characters)

  useEffect(() => {
    function onConnect() {
      console.log("✅ connected!")
    }

    function onDisconnect() {
      console.log("❌ disconnected!")
    }

    function onHello() {
      console.log("👋 hello from server")
    }

    function onCharacters(value) {
      setCharacters(value)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("hello", onHello)
    socket.on("characters", onCharacters)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("hello", onHello)
      socket.off("characters", onCharacters)
    }
  }, [])

  return null
}
