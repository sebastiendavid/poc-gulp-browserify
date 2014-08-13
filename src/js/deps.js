'use strict';
var dependencies = {};
var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

module.exports = {
    get: function (name) {
        return dependencies[name];
    },
    add: function (deps, names) {
        if (isArray(deps) && isArray(names)) {
            for (var i = 0; i < deps.length; i++) {
                dependencies[names[i]] = deps[i];
            }
        }
    }
};
