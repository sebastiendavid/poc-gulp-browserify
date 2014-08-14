'use strict';
var _ = require('lodash');
var Q = require('q');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stringify = require('stringify');
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
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var handlebars = require('gulp-compile-handlebars');
var minify = false;

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
gulp.task('server', ['copy', 'browserify', 'sass', 'html', 'watch', 'connect']);
gulp.task('dist', ['minify', 'copy', 'lint', 'test', 'browserify', 'sass', 'html']);

gulp.task('browserify', function () {
    var task = gulp.src('./src/js/Foobar.js')
        .pipe(browserify({
            standalone: 'poc.widgets.Foobar'
        }))
        .on('prebundle', function (bundle) {
            bundle.transform(stringify(['.hbs', '.txt', '.html', '.json']));
            bundle.require(require.resolve('./src/js/angular.js'), {
                expose: 'angular'
            });
        })
        .pipe(rename('Foobar.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/js/Foobar2.js')
        .pipe(browserify({
            standalone: 'poc.widgets.Foobar2'
        }))
        .on('prebundle', function (bundle) {
            bundle.transform(stringify(['.hbs', '.txt', '.html', '.json']));
            bundle.require(require.resolve('./src/js/angular.js'), {
                expose: 'angular'
            });
        })
        .pipe(rename('Foobar2.js'))
        .pipe(gulp.dest('./dist'));

    if (minify) {
        task.pipe(uglify())
            .pipe(rename('Foobar.min.js'))
            .pipe(gulp.dest('./dist'));
    }
});

gulp.task('copy', function () {
    gulp.src('./src/js/main.js').pipe(gulp.dest('./dist'));
});

gulp.task('connect', ['find:port'], function () {
    var app = connect()
        .use(morgan('dev'))
        .use(serveStatic('./dist/'))
        .use(serveStatic('./bower_components/'));
    server = http.createServer(app).listen(port);
    log.info('server is listening to ' + port);
});

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['copy', 'browserify']);
    gulp.watch('./src/html/**/*.html', ['browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/index.hbs', ['html']);
    gulp.watch('gulpfile.js', ['server:stop', 'connect']);
});

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

gulp.task('minify', function () {
    minify = true;
});

gulp.task('lint', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function () {
    var task = gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./dist'));

    if (minify) {
        task.pipe(minifyCSS())
            .pipe(rename('main.min.css'))
            .pipe(gulp.dest('./dist'));
    }
});

gulp.task('html', function () {
    var task = gulp.src('./src/index.hbs')
        .pipe(handlebars({
            minify: minify
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));

    if (minify) {
        task.pipe(minifyHTML())
            .pipe(gulp.dest('./dist'));
    }
});
