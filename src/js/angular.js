'use strict';
module.exports = require('./globals.js').deps.angular || window.angular;

if (!module.exports) {
    throw new Error('Angular.js is not loaded');
}
