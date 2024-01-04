import io from "socket.io-client";

const socket = io("http://192.168.1.71:3000")

export default socket