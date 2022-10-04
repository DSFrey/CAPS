'use strict';

const eventPool = require('./eventPool');
const { driverHandler } = require('./modules/driver');
const { deliveredHandler, pickupHandler } = require('./modules/vendor');

eventPool.on('*', (payload) => console.log({ time: Date.now, payload }));
eventPool.on('pickup', driverHandler);
eventPool.on('delivered', deliveredHandler);

pickupHandler('Store');
