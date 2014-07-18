'use strict';
var _ = require('lodash');
var hbs = require('./Handlebars.js');
var Backbone = require('backbone');
var Marionette;

Backbone.$ = require('jquery');
require('backbone.babysitter');
require('backbone.wreqr');
Marionette = require('backbone.marionette');

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
