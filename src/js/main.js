'use strict';
(function () {
    requirejs.config({
        baseUrl: './',
        paths: {
            'jquery': 'jquery/dist/jquery.min',
            'lodash': 'lodash/dist/lodash.min',
            'moment': 'moment/min/moment.min',
            'angular': 'angular/angular.min',
            'angular-cookies': 'angular-cookies/angular-cookies.min',
            'angular-resource': 'angular-resource/angular-resource.min',
            'angular-route': 'angular-route/angular-route.min',
            'angular-sanitize': 'angular-sanitize/angular-sanitize.min'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'lodash': {
                exports: '_'
            },
            'moment': {
                exports: 'moment'
            },
            'angular': {
                exports: 'angular',
                deps: ['jquery']
            },
            'angular-cookies': {
                deps: ['angular']
            },
            'angular-resource': {
                deps: ['angular']
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-sanitize': {
                deps: ['angular']
            }
        }
    });

    requirejs(['./app'], function (app) {
        requirejs(app.deps, function () {
            console.info('dependencies loaded for angular app');
            app.start(arguments);
        });
    });
})();
