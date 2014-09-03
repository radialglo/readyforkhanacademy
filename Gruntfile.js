/**
 * Ready for Khan Academy
 * @author Anthony Su
 */

module.exports = function (grunt) {

    "use strict";
    require("load-grunt-tasks")(grunt);

    var assetsDir = "assets/",
        sassDir = assetsDir + "scss/",
        cssDir = assetsDir + "css/",
        jsDir = assetsDir + "js/";

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        shell: {
            cleanCSS: {
                command: "rm " + cssDir + "*.css"
            }
        },

        sass: {
            build: {
                options: {
                    style: "expanded",
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: sassDir,
                    src: ["*.scss"],
                    dest: cssDir,
                    ext: ".css",
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: cssDir,
                    src: ["!*min.css", "*.css"],
                    dest: cssDir,
                    ext: ".min.css"
                }]
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
                    // Node Constants
                    "module": false,
                    "require": false,
                    "define": false,

                    "console": false,

                    // libraries
                    "Hammer": false,
                    "Modernizr": false,

                    // other
                    "addWheelListener": false,
                    "SlidedeckView": false,
                    "SlideView": false,

                    // Iframe Slides
                    "AaronTropeSlideView": false,
                    "KeylightSlideView": false,
                    "HelloRacerSlideView": false,

                    // Animation Slides
                    "HelloKASlideView": false,
                    "ReadySlideView": false,

                    // vars
                    "$": false,
                    "$$": false,
                    "StartView": false
                }
            },
            all: {
                src: [
                    "Gruntfile.js", jsDir + "src/readyforkhanacademy.js"
                ]
            }
        },
        uglify: {
            options: {
                banner: '/* /? [- /\\ |) `/   /= () /?   /< |-| /\\ |\\| /\\ ( /\\ |) [- |\\/| `/ <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: jsDir,
                    src: ['*.js', '!*min.js'], // don't minify min files
                    dest: jsDir,
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            css: {
                files: [sassDir + "*.scss", sassDir + "**/" + "*.scss"],
                tasks: ["css"]
            }
        },
        build: {
            // data
            all: {
                dest: jsDir + "dist/app.js",
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [jsDir + 'src/lib/hammer.min.js', jsDir + 'dist/app.js'],
                dest: jsDir + 'readyforkhanacademy.js',
            },
        }

    });

    grunt.loadTasks(jsDir + "build/tasks");
    grunt.registerTask("default",  ["js", "css"]);
    grunt.registerTask("js", ["jshint", "build:*:*", "concat", "uglify"]);
    grunt.registerTask("css",  ["shell:cleanCSS", "sass", "cssmin"]);
};
