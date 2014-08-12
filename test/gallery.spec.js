/* global describe: false, it: false, beforeEach: false */
'use strict';
var _ = require('lodash');
var assert = require('assert');
var proxyquire = require('proxyquire');

describe('gallery.js', function () {
    var galleryCtrl;

    beforeEach(function () {
        galleryCtrl = proxyquire('../src/js/gallery.js', {
            angular: {
                '@noCallThru': true
            }
        });
    });

    it('should gallery controller be a function', function () {
        // then
        assert.strictEqual(_.isFunction(galleryCtrl), true);
    });

    it('should gallery controller initialize its scope', function () {
        // given
        var $scope = {};

        // when
        galleryCtrl($scope);

        // then
        assert.strictEqual(_.isString($scope.title), true);
        assert.strictEqual(_.isEmpty($scope.title), false);
        assert.strictEqual(_.isArray($scope.images), true);
        assert.strictEqual(_.isEmpty($scope.images), false);
    });
});
