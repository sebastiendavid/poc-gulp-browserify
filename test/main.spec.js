/* global describe: false, it: false, beforeEach: false */
'use strict';
var _ = require('lodash');
var assert = require('assert');
var proxyquire = require('proxyquire');

describe('main.js', function () {
    var app;

    beforeEach(function () {
        var template = function () {
            return 'foobar';
        };
        template['@noCallThru'] = true;

        app = proxyquire('../src/js/main.js', {
            'angular': require('./angular.stub.js'),
            '../html/gallery.html': template
        });
    });

    it('should have initialize application', function () {
        // then
        assert.strictEqual(_.isUndefined(app), false);
        assert.strictEqual(_.isNull(app), false);
        assert.strictEqual(_.isString(app.id), true);
        assert.strictEqual(_.isEmpty(app.id), false);
        assert.strictEqual(_.isArray(app.deps), true);
        assert.strictEqual(_.isEmpty(app.deps), false);
    });

    it('should configure routes', function () {
        // given
        var routes = app['@routes'];

        // then
        assert.strictEqual(routes.hasOwnProperty('/gallery'), true);
        assert.strictEqual(routes['@otherwise'].redirectTo, '/gallery');
    });

    it('should set template to gallery route', function () {
        // given
        var template = app['@routes']['/gallery'].template();

        // then
        assert.strictEqual(template, 'foobar');
    });
});
