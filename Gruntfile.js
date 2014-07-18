'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

    grunt.registerTask('default', ['browserify', 'watch']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            bundle: {
                options: {
                    preBundleCB: function (browserify) {
                        browserify.transform(require('stringify')(['.hbs', '.txt', '.html', '.json']));
                    },
                    bundleOptions: {
                        standalone: 'foobar',
                        debug: true
                    }
                },
                src: 'js/jcurry.js',
                dest: 'dist/app.js'
            }
        },

        watch: {
            files: 'js/*',
            tasks: ['default']
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: './',
                    keepalive: true
                }
            }
        }
    });
};
