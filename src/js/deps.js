'use strict';
var dependencies = {};

module.exports = {
    get: function (name) {
        return dependencies[name];
    },
    add: function (deps, names) {
        if (deps && deps.length > 0 && names && names.length > 0) {
            for (var i = 0; i < deps.length; i++) {
                dependencies[names[i]] = deps[i];
            }
        }
    }
};
