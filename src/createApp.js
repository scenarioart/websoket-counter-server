import { MongoClient } from "mongodb";
import express from "express";
import socket from "socket.io";

import Counter from "./counter";

const PORT = process.env.PORT || 8080;

export default function createApp() {
  const app = express();
  const counter = new Counter();

  const server = app
    .get("/", (req, res) =>
      res.json({ method: "My name is websocket-counter-server" })
    )
    .listen(PORT, function() {
      console.log(`server is running on port ${PORT}`);
    });

  const io = socket(server);

  io.on("connection", socket => {
    socket.on("SEND_ADD", () => {
      counter.add();
      io.emit("RECEIVE_STATE", counter.count);
    });
    socket.on("SEND_RESET", () => {
      counter.reset();
      io.emit("RECEIVE_STATE", counter.count);
    });
  });
}
