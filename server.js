const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");
const cors = require("cors");

const port = process.env.PORT || 8081;
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    },
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("broadcast", data);
  });
});

server.listen(port, () => {
  console.log(`server Ok ${port}`);
});
