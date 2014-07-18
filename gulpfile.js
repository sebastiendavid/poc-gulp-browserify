'use strict';
var _ = require('lodash');
var Q = require('q');
var gulp = require('gulp');
var browserify = require('browserify');
var stringify = require('stringify');
var sourceStream = require('vinyl-source-stream');
var connect = require('connect');
var http = require('http');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var portscanner = require('portscanner');
var moment = require('moment');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

require('colors');

var server;
var port;
var log = {
    prefix: function () {
        return '[' + moment().format('HH:mm:ss').grey + '] ';
    },
    info: function (text) {
        console.log(this.prefix() + text.blue);
    },
    warn: function (text) {
        console.log(this.prefix() + text.yellow);
    },
    error: function (text) {
        console.log(this.prefix() + text.red);
    }
};

gulp.task('default', ['server']);

gulp.task('browserify', function () {
    browserify()
        .transform(stringify(['.hbs', '.txt', '.html', '.json']))
        .add('./js/main.js')
        .bundle()
        .pipe(sourceStream('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('connect', ['find:port'], function () {
    var app = connect()
        .use(morgan('dev'))
        .use(serveStatic('./'));
    server = http.createServer(app).listen(port);
    log.info('server is listening to ' + port);
});

gulp.task('watch', function () {
    gulp.watch('js/**/*', ['browserify']);
    gulp.watch('gulpfile.js', ['server:stop', 'connect']);
});

gulp.task('server', ['browserify', 'watch', 'connect']);

gulp.task('server:stop', function () {
    if (server && _.isFunction(server.close)) {
        var deferred = Q.defer();
        server.close(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }
});

gulp.task('find:port', ['server:stop'], function () {
    if (!_.isNumber(port) || port < 1) {
        var deferred = Q.defer();
        portscanner.findAPortNotInUse(8000, 8999, '127.0.0.1', function (error, found) {
            if (error) {
                log.error(JSON.stringify(error));
                deferred.reject();
            } else {
                log.info('port found: ' + found);
                port = found;
                deferred.resolve();
            }
        });
        return deferred.promise;
    }
});

gulp.task('test', function () {
    gulp.src('./test/**/*.spec.js', {
        read: false
    }).pipe(mocha({
        reporter: 'spec'
    }));
});

gulp.task('uglify', function () {
    gulp.src('./dist/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
    gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});
