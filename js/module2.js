'use strict';
var Marionette = require('marionette');
module.exports = Marionette.Controller.extend({
    initialize: function () {
        console.info('Module2: initialize');
    },

    foobar: function () {
        return 'foobar';
    }
});
