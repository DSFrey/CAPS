'use strict';

const eventPool = require('../hub');

let driverHandler = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  eventPool.emit('in-transit', payload);
  console.log(`DRIVER: delievered ${payload.orderID}`);
  eventPool.emit('delivered', payload);
};

module.exports = { driverHandler };
