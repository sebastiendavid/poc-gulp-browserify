'use strict';
module.exports = (window || global)._;

if (!module.exports) {
    throw new Error('lodash does not exists in global context');
}
