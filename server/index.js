import { Server } from "socket.io"

const io = new Server({
  cors: {
    origin: [
      "https://monumental-kangaroo-86a203.netlify.app",
      "http://localhost:5176",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

io.listen(3001)

const characters = []

const generateRandomPosition = () => [Math.random() * 3, 0, Math.random() * 3]
const generateRandomHexColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16)

// ✅ Global cleanup
setInterval(() => {
  const now = Date.now()
  const TIMEOUT = 150000

  const before = characters.length
  for (let i = characters.length - 1; i >= 0; i--) {
    if (now - characters[i].lastSeen > TIMEOUT) {
      characters.splice(i, 1)
    }
  }

  if (characters.length !== before) {
    io.emit("characters", characters)
  }
}, 5000)

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
    const character = characters.find((c) => c.id === socket.id)
    if (character) {
      character.position = position
      character.lastSeen = Date.now()
    }
    io.emit("characters", characters)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")

    characters.splice(
      characters.findIndex((c) => c.id === socket.id),
      1
    )
    io.emit("characters", characters)
  })
})
