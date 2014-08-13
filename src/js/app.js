'use strict';
var exports = function (_opt) {
    var opt = _opt || {};
    if (typeof opt.getDeps === 'function') {
        opt.getDeps(exports.deps)
            .then(exports.addDeps)
            .fail(console.error)
            .done(exports.start);
    }
};

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

exports.start = function (deps) {
    if (deps) {
        exports.addDeps(deps);
    }

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
