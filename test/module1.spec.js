/* global describe: false, it: false, before: false */
'use strict';
var assert = require('assert');
var initDom = require('./before.js');

describe('Module1 specs', function () {
    var Module1;
    var Marionette;
    var module1;

    before(function (done) {
        initDom().done(function () {
            Module1 = require('../js/module1.js');
            Marionette = require('../js/Marionette.js');
            module1 = new Module1();
            done();
        });
    });

    it('should be an instance of Marionette ItemView', function () {
        assert.equal(module1 instanceof Marionette.ItemView, true);
    });

    it('should render view and contains model value', function () {
        module1.model.set('foobar', 1);
        module1.render();
        assert.equal(module1.$el.text().indexOf('value: 1') >= 0, true);
    });
});
