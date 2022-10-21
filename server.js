const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");
const cors = require("cors")


const port = 8080;
const app = express();

app.use(cors())

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {

  socket.on("message", (data) => {
    io.emit("broadcast", data);
  });

  


});

server.listen(port, () => {
  console.log("Server OK");
});
