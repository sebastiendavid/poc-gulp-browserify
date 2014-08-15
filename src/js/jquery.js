'use strict';
module.exports = (window || global).$;

if (!module.exports) {
    throw new Error('jQuery does not exists in global context');
}
