'use strict';
module.exports = function () {
    var jsdom = require('jsdom');
    var Q = require('q');
    var deferred = Q.defer();

    jsdom.env({
        html: 'empty',
        scripts: [],
        done: function (errors, window) {
            global.window = window;
            global.document = window.document;
            deferred.resolve();
        }
    });

    return deferred.promise;
};
