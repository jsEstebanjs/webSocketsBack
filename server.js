const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");
const cors = require("cors");

const port = 8080 || 5000;
const app = express();


app.use(cors())
const server = http.createServer(app);
const io = SocketIO(server ,{
  cors: {
    origin: "https://websocketsfront.vercel.app/",
    method: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("broadcast", data);
  });
});

server.listen(port, () => {
  console.log("Server OK");
});
