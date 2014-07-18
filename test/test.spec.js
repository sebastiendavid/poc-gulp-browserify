/* global describe: false, it: false, before: false */
'use strict';
var assert = require('assert');
var initDom = require('./before.js');

describe('Module2 specs', function () {
    var Module2;
    var Marionette;
    var module2;

    before(function (done) {
        initDom().done(function () {
            Module2 = require('../js/module2.js');
            Marionette = require('../js/Marionette.js');
            module2 = new Module2();
            done();
        });
    });

    it('should be an instance of Marionette Controller', function () {
        assert.equal(module2 instanceof Marionette.Controller, true);
    });

    it('should be foobar', function () {
        assert.equal(module2.foobar(), 'foobar');
    });
});
