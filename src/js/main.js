'use strict';
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
module.exports = angular.module('angularApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/gallery', {
            template: galleryTemplate,
            controller: GalleryCtrl
        })
        .otherwise({
            redirectTo: '/gallery'
        });
});
