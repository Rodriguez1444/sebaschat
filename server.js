const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("mensaje", (data) => {
        socket.broadcast.emit("mensaje", data);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

server.listen(3000, () => {
    console.log("Chat activo en http://localhost:3000");
});
