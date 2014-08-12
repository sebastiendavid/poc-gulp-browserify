'use strict';
var routes = {};

var $routeProvider = {
    when: function (route, opt) {
        routes[route] = opt;
        return this;
    },
    otherwise: function (opt) {
        routes['@otherwise'] = opt;
        return this;
    }
};

var Module = function (id, deps) {
    this.id = id;
    this.deps = deps;
    this['@routes'] = routes;
};

Module.prototype.config = function (func) {
    func($routeProvider);
    return this;
};

module.exports = {
    '@noCallThru': true,
    module: function (id, deps) {
        return new Module(id, deps);
    }
};
