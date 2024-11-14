const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = require("http").createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (soc) => {
  soc.on("Send name", (username) => {
    io.emit("Send name", username);
  });

  soc.on("Send message", (chat) => {
    io.emit("Send message", chat);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
