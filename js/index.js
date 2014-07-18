'use strict';
var browserify = require('browserify');
var stringify = require('stringify');

var bundle = browserify()
    .transform(stringify(['.hbs', '.html', '.txt', '.json']))
    .add('jcurry.js');

app.use(bundle); // jshint ignore:line
