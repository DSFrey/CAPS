'use strict';

require('dotenv').config({ path: '../../.env' });
const { Server } = require('socket.io');
const { Queue } = require('./lib/queue');
const server = new Server(process.env.PORT);

const caps = server.of('/caps');
const messageQueue = new Queue();

caps.on('connection', socket => {
  console.log('Socket connected to caps namespace: ', socket.id);

  socket.prependAny((eventName, payload) => {
    payload.event = eventName;
    new EventLog(payload).log();
  });

  socket.on('join', (payload) => {
    socket.join(payload.queueID);
  });

  socket.on('ready', (payload) => {

    messageQueue.store(payload);
    socket.broadcast.emit('ready', payload);
  });

  socket.on('in-transit', (payload) => {
    messageQueue.store(payload);
    socket.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    messageQueue.store(payload);
    socket.to(payload.store).emit('delivered', payload);
  });

  socket.on('get-all', (payload) => {
    let currentQueue = messageQueue.retrieve(payload.queueID);
    if (currentQueue) {
      Object.keys(currentQueue.data).forEach(messageID => {
        let payload = currentQueue.retrieve(messageID);
        console.log(payload);
        socket.emit(payload.event, payload);
      });
    }
  });

  socket.on('received', (id) => {
    let deletedID = messageQueue.remove(id.queueID, id.messageID);
    socket.emit('removed', deletedID);
  });
});


class EventLog {
  constructor(payload) {
    this.event = payload.event;
    this.time = new Date().toISOString();
    this.payload = payload;
  }
  log() {
    console.log(this);
  }
}
