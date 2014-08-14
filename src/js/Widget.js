'use strict';
var exports = function () {
    this.required = [];
};

exports.prototype.addDeps = function (deps) {
    require('./deps.js').add(deps, this.required);
};

exports.prototype.start = function () {
    this.addDeps(arguments);
};

exports.prototype.extend = function () {

};
