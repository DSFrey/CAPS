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
  eventPool.emit('pickup', payload);
};

let deliveredHandler = (payload) => {
  console.log(`Thank you, ${payload.customer}`);
};

module.exports = { pickupHandler, deliveredHandler };
