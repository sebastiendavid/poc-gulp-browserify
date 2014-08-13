(function () {
    'use strict';
    requirejs.config({
        baseUrl: './',
        paths: {
            'angular': 'angular/angular.min',
            'angular-cookies': 'angular-cookies/angular-cookies.min',
            'angular-resource': 'angular-resource/angular-resource.min',
            'angular-route': 'angular-route/angular-route.min',
            'angular-sanitize': 'angular-sanitize/angular-sanitize.min',
            'jquery': 'jquery/dist/jquery.min',
            'lodash': 'lodash/dist/lodash.min',
            'moment': 'moment/min/moment.min',
            'q': 'q/q'
        },
        shim: {
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
            },
            'jquery': {
                exports: '$'
            },
            'lodash': {
                exports: '_'
            },
            'moment': {
                exports: 'moment'
            },
            'q': {
                exports: 'Q'
            }
        }
    });

    requirejs(['q', './app'], function (Q, app) {
        requirejs(app.deps, function () {
            console.info('dependencies loaded for angular app');
            app.start(arguments);
        });
    });
})();
