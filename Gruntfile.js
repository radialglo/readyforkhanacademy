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
                    "require": false
                }
            },
            all: {
                src: [
                    "Gruntfile.js"
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
                dest: jsDir + "readyforkhanacademy.js",
            }
        },

    });

    grunt.loadTasks(jsDir + "build/tasks");
    grunt.registerTask("default",  ["js", "css"]);
    grunt.registerTask("js", ["jshint", "build:*:*", "uglify"]);
    grunt.registerTask("css",  ["shell:cleanCSS", "sass", "cssmin"]);
};
