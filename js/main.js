'use strict';
var _ = require('lodash');
var moment = require('moment');
var Module1 = require('./module1.js');
var Module2 = require('./module2.js');
var foobars = ['foobar1', 'foobar2', 'foobar3'];

console.info(moment().toString());

_.forEach(foobars, function (foo) {
    console.warn(foo);
});

var view = new Module1();
var ctrl = new Module2();

console.debug(view);
console.debug(ctrl);
