'use strict';
module.exports = (window || global).angular;

if (!module.exports) {
    throw new Error('Angular does not exists in global context');
}
