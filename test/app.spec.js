/* global describe: false, it: false, beforeEach: false */
'use strict';
var _ = require('lodash');
var assert = require('assert');
var proxyquire = require('proxyquire');

describe('app.js', function () {
    var app;

    beforeEach(function () {
        var template = function () {
            return 'foobar';
        };
        template['@noCallThru'] = true;

        app = proxyquire('../src/js/app.js', {
            'angular': require('./angular.stub.js'),
            '../html/gallery.html': template
        });
    });

    it('should have initialize application', function () {
        // then
        assert.strictEqual(_.isUndefined(app), false);
        assert.strictEqual(_.isNull(app), false);
        assert.strictEqual(_.isArray(app.deps), true);
        assert.strictEqual(_.isEmpty(app.deps), false);
        assert.strictEqual(_.isFunction(app.start), true);
    });
});
