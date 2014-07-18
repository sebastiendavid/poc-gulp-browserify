'use strict';
console.info('jCurry ?');

try {
    var vendor = require('./vendor.js');
    var $ = vendor.$;
    console.log('jCurry :) body: ' + $('body').length);
    console.log(require('./template.hbs'));
} catch (e) {
    console.error('no jCurry :(');
}
