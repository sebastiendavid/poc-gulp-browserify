'use strict';
module.exports = (window || global).moment;

if (!module.exports) {
    throw new Error('Moment does not exists in global context');
}
