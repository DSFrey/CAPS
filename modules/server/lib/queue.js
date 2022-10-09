'use strict';

class Queue {
  constructor() {
    this.data = {};
  }

  store(payload) {
    if (!this.data[payload.queueID]) {
      this.data[payload.queueID] = new this.constructor();
    }
    this.data[payload.queueID].data[payload.messageID] = payload;
  }

  retrieve(key) {
    return this.data[key];
  }

  remove(queueID, messageID) {
    if (!this.data[queueID]) throw new Error('No queue created');
    console.log(`${messageID} was removed from queue`);
    delete this.data[queueID].data[messageID];
    return messageID;
  }
}

module.exports = { Queue };
