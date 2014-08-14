'use strict';
var exports = function (_opt) {
    var opt = _opt || {};
    if (!opt.uuid) {
        throw new Error('Invalid constructor\'s parameters');
    }
    this.uuid = opt.uuid;
};

exports.prototype.info = {
    name: 'foobar',
    required: [
        'angular',
        'angular-cookies',
        'angular-resource',
        'angular-route',
        'angular-sanitize'
    ]
};

exports.prototype.init = function (angular) {
    var GalleryCtrl = require('./gallery.js');
    var galleryTemplate = require('../html/gallery.html');
    var name = this.info.name;
    var galleryCtrlName = name + '-' + this.uuid;

    var module = angular.module('foobarWidget', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize'
    ]);

    module.run(['$templateCache', function ($templateCache) {
        $templateCache.put(name + '.html', galleryTemplate.replace('GalleryCtrl', galleryCtrlName));
    }]);

    module.controller(galleryCtrlName, ['$scope', GalleryCtrl]);

    return module;
};

module.exports = exports;
