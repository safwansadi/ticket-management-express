const path = require("path");
const express = require("express");
const app = express();
const { PORT } = require("./utils/env");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("./utils/env");

app.use(express.static(path.join(__dirname, "uploads")));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      JWT_PRIVATE_KEY,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", function (socket) {
  socket.on("message", function (message) {
    io.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = server;
