'use strict';

const Chance = require('chance');
const chance = new Chance();

require('dotenv').config({ path: '../../.env' });

const io = require('socket.io-client');

class Vendor {
  constructor(vendorName) {
    this.socket = io.connect(`http://localhost:${process.env.PORT}/caps`);
    this.name = vendorName;
    this.socket.emit('join', vendorName);
    this.socket.on('pickup', (payload) => console.log(`${this.name}: Order picked up ${payload.orderID}`));
    this.socket.on('delivered', (payload) => console.log(`${this.name}: Order delivered. Thank you, ${payload.customer}`));
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
}

let vendor1 = new Vendor(chance.company());
let vendor2 = new Vendor(chance.company());

setInterval(() => vendor1.readyOrder(), 30000);
setTimeout(() => setInterval(() => vendor2.readyOrder(), 30000), 15000);
