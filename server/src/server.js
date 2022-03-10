import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
server.listen(3003, () => {
  console.log("✅ Server listening on port 3003");
});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

/////////////////////////////////////////////////////////////////
let playersArrayServer = [];

io.on("connection", (socket) => {
  console.log("🔗 User connected", "socket.id :", socket.id);
  playersArrayServer.push({ id: socket.id, x: 0, y: 0, point: 0 });
  socket.emit("init", { id: socket.id, players: playersArrayServer });
  console.log("playersArrayServer", playersArrayServer);

  socket.on("player-move", (myMoveInfo) => {
    console.log("🔗 Player move", myMoveInfo);

    const updatedPlayers = playersArrayServer.filter((player) => {
      console.log(player.id, myMoveInfo.id);
      return player.id !== myMoveInfo.id;
    });
    console.log("updatedPlayers", updatedPlayers);
    playersArrayServer = [...updatedPlayers, myMoveInfo];
    console.log("playersArrayServer", playersArrayServer);
    socket.broadcast.emit("move-otherPlayer", playersArrayServer);
  });

  socket.on("disconnecting", () => {});
  socket.on("disconnect", () => {
    console.log("🔗 User disconnected", "socket.id :", socket.id);
    playersArrayServer.splice(playersArrayServer.indexOf(socket.id), 1);
  });
});
