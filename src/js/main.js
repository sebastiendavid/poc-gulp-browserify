(function (require) {
    'use strict';
    require.config({
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
            'ocLazyLoad': 'ocLazyLoad/dist/ocLazyLoad.min',
            'q': 'q/q',
            'uuid': 'node-uuid/uuid'
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
            'ocLazyLoad': {
                deps: ['angular']
            },
            'q': {
                exports: 'Q'
            }
        }
    });

    require(['jquery', 'lodash', 'q', 'uuid', 'angular', 'angular-cookies', 'angular-resource', 'angular-route',
        'angular-sanitize', 'ocLazyLoad'
    ], function ($, _, Q, uuid, angular) {

        var app = angular.module('angularApp', [
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'oc.lazyLoad'
        ]);

        var jsLoader = function (files, done) {
            require(files, function (Widget) {
                var widget = new Widget({
                    uuid: uuid.v4()
                });
                require(widget.info.required, function () {
                    widget.init.apply(widget, arguments);
                    done();
                });
            });
        };

        app.config(['$ocLazyLoadProvider',
            function ($ocLazyLoadProvider) {
                $ocLazyLoadProvider.config({
                    jsLoader: jsLoader
                });
            }
        ]);

        app.controller('MainCtrl', ['$scope', '$ocLazyLoad',
            function ($scope, $ocLazyLoad) {
                $scope.title = 'Angular application';
                $scope.widgets = [];

                $scope.loadWidget = function (widget) {
                    $ocLazyLoad.load({
                        name: widget.name,
                        files: widget.files
                    }).then(function () {
                        widget.partial = widget.templateUrl;
                    }, function (e) {
                        throw e;
                    });
                };

                $scope.widgets.push({
                    name: 'foobarWidget2',
                    files: ['./Foobar2'],
                    templateUrl: 'foobar2.html',
                    partial: ''
                });
                $scope.widgets.push({
                    name: 'foobarWidget',
                    files: ['./Foobar'],
                    templateUrl: 'foobar.html',
                    partial: ''
                });
            }
        ]);

        angular.bootstrap($('#main')[0], ['angularApp']);
    });

})(window.requirejs);
