'use strict';

const { io } = require('socket.io-client');
let socket = io('http://localhost:3001/caps');

socket.on('ready-pickup', (payload) => {
  console.log(`Picked up ${payload.orderID}`);
  socket.emit('in-transit', payload);
});

socket.on('ready-deliver', (payload) => {
  console.log(`Delivered ${payload.orderID}`);
  socket.emit('delivered', payload);
});
