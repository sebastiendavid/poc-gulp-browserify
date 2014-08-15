'use strict';
var _ = require('lodash');
var Widget = function (opt) {
    if (!this.info || !this.info.name || !this.info.required) {
        throw new Error('Widget\'s informations are missing');
    }
    this.initialize(opt);
    return this;
};

_.assign(Widget.prototype, {
    initialize: function () {}
});

_.assign(Widget, {
    extend: function (props) {
        var Func = function (opt) {
            Widget.call(this, opt);
            return this;
        };
        _(Func.prototype).assign(Widget.prototype).assign(props);
        _(Func).assign({
            extend: Widget.extend
        });
        return Func;
    }
});

module.exports = Widget;
