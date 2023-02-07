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

    // pass room id through data
    socket.on('join_room', (data) => {
      socket.join()
      console.log(`User with id ${socket.id} joined joined room ${data}`);
    })

    socket.on('send_message', (data) => {
      console.log('data received', data);
      socket.to(data.roomID).emit('recieved_message', data)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`, socket.id);
    })
})

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
