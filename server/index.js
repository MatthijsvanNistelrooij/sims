import { Server } from "socket.io"

const io = new Server({
  cors: {
    origin: "http://localhost:5176",
  },
})

io.listen(3001)

const characters = []

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3]
}

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16)
}

io.on("connection", (socket) => {
  console.log("user connected")

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    hairColor: generateRandomHexColor(),
    topColor: generateRandomHexColor(),
    bottomColor: generateRandomHexColor(),
    lastSeen: Date.now(),
  })

  socket.emit("hello")

  io.emit("characters", characters)

  socket.on("move", (position) => {
    const character = characters.find((character) => character.id === socket.id)
    if (character) {
      character.position = position
      character.lastSeen = Date.now()
    }
    io.emit("characters", characters)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected")

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    )
    io.emit("characters", characters)
  })
})
