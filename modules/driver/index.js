'use strict';

require('dotenv').config({ path: '../../.env' });

const io = require('socket.io-client');
let socket = io.connect(`http://localhost:${process.env.PORT}/caps`);

socket.on('ready-pickup', (payload) => {
  console.log(`Picked up ${payload.orderID}`);
  socket.emit('in-transit', payload);
});

socket.on('ready-deliver', (payload) => {
  console.log(`Delivered ${payload.orderID}`);
  socket.emit('delivered', payload);
});
