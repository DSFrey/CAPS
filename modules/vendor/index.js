'use strict';

const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');
let socket = io('http://localhost:3001/caps');

class Vendor {
  constructor(vendorName) {
    this.name = vendorName;
    socket.join(vendorName);
    socket.on('pickup', (payload) => console.log(`Order picked up ${payload.orderID}`));
    socket.on('delivered', (payload) => console.log(`Order delivered. Thank you, ${payload.customer}`));
  }
  readyOrder() {
    let payload = {
      store: this.name,
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    console.log(`Ready for pickup ${payload.orderID}`);
    socket.emit('ready', payload);

  }
}

let vendor1 = new Vendor(chance.company());
let vendor2 = new Vendor(chance.company());

setInterval(() => vendor1.readyOrder(), 5000);
setInterval(() => vendor2.readyOrder(), 8000);
