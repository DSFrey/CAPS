'use strict';

const Event = require('events');
const eventPool = new Event();

eventPool.on('*', (payload) => console.log({ time: Date.now, payload }));

module.exports = eventPool;
