'use strict';

require('dotenv').config({ path: '../../.env' });

const Chance = require('chance');
const chance = new Chance();

const io = require('socket.io-client');
let socket = io.connect(`http://localhost:${process.env.PORT}/caps`);

socket.emit('get-all', {queueID: 'driver'});

socket.on('ready', (payload) => {
  received(payload);
  setTimeout(() => {
    console.log(`Picked up ${payload.orderID}`);
    payload.queueID = payload.store;
    payload.messageID = chance.guid();
    socket.emit('in-transit', payload);
    setTimeout(() => {
      console.log(`Delivered ${payload.orderID}`);
      payload.messageID = chance.guid();
      socket.emit('delivered', payload);
    }, 5000);
  }, 5000);
});

function received(payload) {
  let id = {
    queueID: payload.queueID,
    messageID: payload.messageID,
  };
  socket.emit('received', id);
}
