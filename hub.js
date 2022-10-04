'use strict';

const Event = require('events');
const eventPool = new Event();

eventPool.on('*', (payload) => console.log(payload));

module.exports = eventPool;
