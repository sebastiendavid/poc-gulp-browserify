'use strict';
var exports = function (_opt) {
    var opt = _opt || {};
    if (!opt.uuid) {
        throw new Error('Invalid constructor\'s parameters');
    }
    this.uuid = opt.uuid;
};

exports.prototype.info = {
    name: 'foobar2',
    required: [
        'angular',
        'angular-cookies',
        'angular-resource',
        'angular-route',
        'angular-sanitize'
    ]
};

exports.prototype.init = function (angular) {
    var foobarTemplate = require('../html/foobar.html');
    var name = this.info.name;
    var foobar2CtrlName = name + '-' + this.uuid;

    var module = angular.module('foobarWidget2', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize'
    ]);

    module.run(['$templateCache', function ($templateCache) {
        $templateCache.put(name + '.html', foobarTemplate.replace('Foobar2Ctrl', foobar2CtrlName));
    }]);

    module.controller(foobar2CtrlName, ['$scope', function ($scope) {
        $scope.label = 'hello';
    }]);

    return module;
};

module.exports = exports;
