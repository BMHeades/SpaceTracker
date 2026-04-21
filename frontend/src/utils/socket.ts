import { io } from "socket.io-client";


export const socket = io("https://spacetracker-backend.onrender.com", {
    autoConnect: true
});

// socket.connect()