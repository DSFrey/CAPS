'use strict';

const Chance = require('chance');
const chance = new Chance();

require('dotenv').config({ path: '../../.env' });

const io = require('socket.io-client');
let socket = io.connect(`http://localhost:${process.env.PORT}/caps`);

class Vendor {
  constructor(vendorName) {
    this.name = vendorName;
    socket.emit('join', vendorName);
    socket.on('pickup', (payload) => console.log(`${this.name}: Order picked up ${payload.orderID}`));
    socket.on('delivered', (payload) => console.log(`${this.name}: Order delivered. Thank you, ${payload.customer}`));
  }
  readyOrder() {
    let payload = {
      store: this.name,
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    console.log(`${this.name}: Ready for pickup ${payload.orderID}`);
    socket.emit('ready', payload);

  }
}

let vendor1 = new Vendor(chance.company());
let vendor2 = new Vendor(chance.company());

setInterval(() => vendor1.readyOrder(), 5000);
setInterval(() => vendor2.readyOrder(), 8000);
