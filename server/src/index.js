const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = 8080;
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
});

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`, socket.id);
    })
})

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
