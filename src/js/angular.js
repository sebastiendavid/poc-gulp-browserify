'use strict';
module.exports = require('./deps.js').get('angular');

if (!module.exports) {
    throw new Error('Angular.js is not loaded');
}
