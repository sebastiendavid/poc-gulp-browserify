'use strict';
var Marionette = require('./Marionette.js');
module.exports = Marionette.ItemView.extend({
    el: 'body',
    initialize: function () {
        console.info('Module1: initialize');
    }
});
