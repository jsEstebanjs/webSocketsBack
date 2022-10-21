const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");
const cors = require("cors");

const port = process.env.PORT || 8081;
const app = express();


const corsOptions = {
  origin:"https://websocketsfront.vercel.app",
  optionsSuccesStatus: 200,
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: '*',
    method:['GET' , 'POST'],

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
