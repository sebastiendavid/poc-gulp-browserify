'use strict';
module.exports = require('./deps.js').get('angular') || window.angular;

if (!module.exports) {
    throw new Error('Angular.js is not loaded');
}
