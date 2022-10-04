'use strict';

const eventPool = require('../eventPool');
const chance = require('./chance');

let pickupHandler = (store) => {
  let payload = {
    store,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log(`VENDOR: ready for pickup ${payload.orderID}`);
  eventPool.emit('pickup', payload);
};

let deliveredHandler = (payload) => {
  console.log(`VENDOR: Thank you, ${payload.customer}`);
};

module.exports = { pickupHandler, deliveredHandler };
