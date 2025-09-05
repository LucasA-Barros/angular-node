import http from 'http';
import app from "./app.js";
import { Server } from "socket.io";

const PORT = 3000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});