'use strict';

const Vendor = require("./lib/vendor");


let vendor1 = new Vendor('vendor1');
let vendor2 = new Vendor('vendor2');

setInterval(() => vendor1.readyOrder(), 30000);
setTimeout(() => setInterval(() => vendor2.readyOrder(), 30000), 15000);
