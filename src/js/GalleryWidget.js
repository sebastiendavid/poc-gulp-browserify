'use strict';
var _, angular;
var Widget = require('./Widget.js');

var exports = Widget.extend({
    initialize: function (_opt) {
        console.info('initialize Gallery widget');
        _ = require('lodash');
        angular = require('angular');
        var opt = _opt || {};
        var uuid = opt.uuid;

        if (!uuid) {
            throw new Error('Invalid constructor\'s parameters');
        }

        var name = this.info.name;
        var galleryCtrl = require('./galleryCtrl.js');
        var galleryCtrlName = name + '-' + uuid;
        var template = require('../html/gallery.html');

        var module = angular.module(name, [
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize'
        ]);

        module.run(['$templateCache',
            function ($templateCache) {
                $templateCache.put(name + '.html', template.replace('GalleryCtrl', galleryCtrlName));
            }
        ]);

        module.controller(galleryCtrlName, ['$scope', galleryCtrl]);

        _.assign(this, {
            uuid: uuid,
            module: module
        });
    },

    info: {
        name: 'GalleryWidget',
        required: [
            'angular',
            'angular-cookies',
            'angular-resource',
            'angular-route',
            'angular-sanitize'
        ]
    }
});

module.exports = exports;
