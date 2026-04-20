import express from 'express'
import { getHorizonsData } from './utils/horizons.js';
import { extractData } from './utils/extract.js';
import { Server } from "socket.io";

const majorBodyID = -143205 // TESLA ROADSTER
const data = await getHorizonsData(majorBodyID);


// socket io
// const httpServer = createServer();
const io = new Server({
  cors: {
    origin: ["http://localhost:5173"]
  }
});

io.on("connection", (socket) => {
  console.log(socket.id)
  io.emit('newHorizons', extractData(data))
});

io.listen(3000);
