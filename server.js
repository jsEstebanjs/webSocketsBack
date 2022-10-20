const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");

const port = 8080;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: "https://websocketfront.vercel.app",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("message", (data) => {
    io.emit("broadcast", data);
  });

  


});

server.listen(port, () => {
  console.log("Server OK");
});
