'use strict';

const eventPool = require('../eventPool');
const chance = require('../chance');
const { driverHandler } = require('../driver');
const { deliveredHandler, pickupHandler } = require('../vendor');

class EventLog {
  constructor(event, payload) {
    this.event = event;
    this.time = new Date().toISOString();
    this.payload = payload;
  }
  log() {
    console.log(this);
  }
}

eventPool.on('pickup', (payload) => new EventLog('pickup', payload).log());
eventPool.on('in-transit', (payload) => new EventLog('in-transit', payload).log());
eventPool.on('delivered', (payload) => new EventLog('delivered', payload).log());

pickupHandler(chance.company());
