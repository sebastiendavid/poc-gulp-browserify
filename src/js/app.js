'use strict';
var exports = {};

exports.deps = [
    'angular',
    'angular-cookies',
    'angular-resource',
    'angular-route',
    'angular-sanitize'
];

exports.addDeps = function (deps) {
    require('./deps.js').add(deps, exports.deps);
};

exports.start = function () {
    exports.addDeps(arguments);
    var angular = require('angular');
    var GalleryCtrl = require('./gallery.js');
    var galleryTemplate = require('../html/gallery.html');

    /**
     * @ngdoc overview
     * @name angularApp
     * @description
     * # angularApp
     *
     * Main module of the application.
     */
    var module = exports.module = angular.module('angularApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize'
    ]);

    module.config(function ($routeProvider) {
        $routeProvider
            .when('/gallery', {
                template: galleryTemplate,
                controller: GalleryCtrl
            })
            .otherwise({
                redirectTo: '/gallery'
            });
    });

    angular.bootstrap(document.body, ['angularApp']);

    return module;
};

module.exports = exports;
