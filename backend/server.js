import express from 'express'
import { getHorizonsData } from './utils/horizons.js';
import { extractData } from './utils/extract.js';
import { Server } from "socket.io";
import { getUTCText } from './utils/time.js';

const majorBodyID = -143205 // TESLA ROADSTER
const pullingInterval = 10000;

const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "https://starmantracker.netlify.app/"]
  }
});

const sendData = async () => {
  const data = await getHorizonsData(majorBodyID);
  io.emit('newHorizons', {
    headers: {
      active: clients.size
    },
    coordinates: extractData(data)})
  
  const now = new Date;
  console.log("emitted data on " + getUTCText(now))
}

const clients = new Set()
let intervalFunc = null;

io.on("connection", (socket) => {
  clients.add(socket.id);
  console.log(socket.id + ' connected. Client Count ' + clients.size)

  sendData();

  if (clients.size === 1) {
    intervalFunc = setInterval(sendData, pullingInterval)
  }

  socket.on("disconnect", () => {
    clients.delete(socket.id);
    console.log(socket.id + ' disconnected. Client Count ' + clients.size)

    if (clients.size === 0) {
      clearInterval(intervalFunc)
      intervalFunc = null
    }
  });
});

io.listen(3000);

