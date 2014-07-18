'use strict';
var Marionette = require('./Marionette.js');
module.exports = Marionette.Controller.extend({
    initialize: function () {
        console.info('Module2: initialize');
    },

    foobar: function () {
        return 'foobar';
    }
});
