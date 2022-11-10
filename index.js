const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');

require('dotenv').config();
require('./models/init');

const authRoute = require('./routes/auth');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/auth', authRoute);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('EstabConn', { lol: 'lol' });

  socket.on('msg', (msg) => {
    socket.broadcast.emit('msg', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected!');
  });
});

app.get('*', (req, res) => {
  res.send('error 404');
});

PORT = process.env.PORT;
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
