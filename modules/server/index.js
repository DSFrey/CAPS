'use strict';

require('dotenv').config({ path: '../../.env' });
const { Server } = require('socket.io');
const server = new Server(process.env.PORT);

const caps = server.of('/caps');

caps.on('connection', socket => {
  console.log('Socket connected to caps namespace: ', socket.id);

  socket.prependAny((eventName, payload) => {
    new EventLog(eventName, payload).log();
  });

  socket.on('join', (store) => {
    socket.join(store);
  });

  socket.on('ready', (payload) => {
    socket.broadcast.emit('load', payload);
  });

  socket.on('in-transit', (payload) =>{
    socket.to(payload.store).emit('pickup', payload);
  });

  socket.on('delivered', (payload) => {
    socket.to(payload.store).emit('delivered', payload);
  });
});


class EventLog {
  constructor(event, payload) {
    this.event = event;
    this.time = new Date().toISOString();
    this.payload = payload;
  }
  log() {
    console.log(this);
  }
}
