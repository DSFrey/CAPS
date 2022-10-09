'use strict'

const Chance = require('chance');
const chance = new Chance();

require('dotenv').config({ path: '../../.env' });

const io = require('socket.io-client');

class Vendor {
  constructor(vendorName) {
    console.log(process.env.PORT)
    this.socket = io.connect(`http://localhost:${process.env.PORT}/caps`);
    this.name = vendorName;
    this.socket.emit('join', {queueID: vendorName});
    this.socket.emit('get-all', {queueID: vendorName});
    this.socket.on('in-transit', (payload) => {
      this.received(payload);
      console.log(`${this.name}: Order picked up ${payload.orderID}`);
    });
    this.socket.on('delivered', (payload) => {
      this.received(payload);
      console.log(`${this.name}: Order delivered. Thank you, ${payload.customer}`);
    });
  }
  readyOrder() {
    let payload = {
      store: this.name,
      queueID: 'driver',
      orderID: chance.guid(),
      messageID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    console.log(`${this.name}: Ready for pickup ${payload.orderID}`);
    this.socket.emit('ready', payload);
  }

  received(payload) {
    let id = {
      queueID: payload.queueID,
      messageID: payload.messageID
    }
    this.socket.emit('received', id)
  }
}

module.exports = Vendor;
