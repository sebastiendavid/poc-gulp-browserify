'use strict';
var _ = require('lodash');
var hbs = require('handlebars');
var Backbone = require('backbone');
var Marionette = Backbone.Marionette;

Marionette.Renderer.render = function (template, data) {
    if (_.isFunction(template)) {
        return template(data);
    } else if (_.isString(template)) {
        if (template.indexOf('{{') >= 0) {
            return hbs.compile(template)(data);
        } else {
            return template;
        }
    } else {
        return template + '';
    }
};

module.exports = Marionette;
