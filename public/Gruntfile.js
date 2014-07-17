
module.exports = function (grunt) {

    "use strict";
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            build: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css',
                }]
            }
        },

        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass']
            }
        },
        jshint: {
            options: {
                "browser": true,
                "jquery": true,
                "strict": true,
                "newcap": true,
                "undef": true,
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "noarg": true,
                "sub": true,
                "boss": true,
                "eqnull": true,
                "laxcomma": true,
                "laxbreak": true,
                "indent": 4,
                "globals": {
                    "SC": false,
                    "Meditation": false,
                    // Node Constants
                    "module": false,
                    "require": false
                }
            },
            all: {
                src: [
                    "Gruntfile.js","js/application.js", "js/meditation.js"
                ]
            }
        }


    });

    grunt.registerTask('default',  ['sass']);
};
