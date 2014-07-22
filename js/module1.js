'use strict';
var Marionette = require('marionette');
var Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
    el: 'body',
    template: require('./template.hbs'),

    initialize: function () {
        console.info('Module1: initialize');
        this.model = new Backbone.Model({
            foobar: 0
        });
    }
});
