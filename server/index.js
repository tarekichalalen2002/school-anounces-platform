const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbconnect");
const Authrouter = require("./routes/authRoute");
const roomrouter = require("./routes/roomRoute");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", Authrouter);
app.use("/api/room", roomrouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log("A user joined a room");
  });

  socket.on("newMessage", (data) => {
    socket.to(data.roomId).emit("receiveMessage", data.message);
    // console.log(`A msg is sent: ${data.message.roomId}`);
    console.log(data)
  });

  

  socket.on("messageResponse", (data) => {
    socket.to(data.senderId).emit("messageResponse", data.response);
  });

  socket.on("createRoomRequest", (data) => {
    socket.emit("createRoomRequest", data);
  });

  socket.on("roomCreationResponse", (data) => {
    socket.to(data.userId).emit("roomCreationResponse", data.approve);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = io;

server.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
