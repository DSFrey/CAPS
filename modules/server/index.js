'use strict';

require('dotenv').config({ path: '../../.env' });
const { Server } = require('socket.io');
const server = new Server(process.env.PORT);

const caps = server.of('/caps');

caps.on('connection', socket => {
  console.log('Socket connected to caps namespace: ', socket.id);

  socket.on('join', (store) => {
    socket.join(store);
    console.log(store);
  });

  socket.on('ready', (payload) => {
    new EventLog('Ready for pickup', payload).log();
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    new EventLog('in-transit', payload).log();
  });

  socket.on('delivered', (payload) => {
    new EventLog('delivered', payload).log();
    socket.broadcast.to(payload.store).emit('delivered', payload);
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
