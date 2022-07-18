"use strict";

const path = require('path');
const sass = require('sass');

module.exports = function (grunt) {
    // We need to include the core Moodle grunt file too, otherwise we can't run tasks like "amd".
    require("grunt-load-gruntfile")(grunt);
    grunt.loadGruntfile("../../Gruntfile.js");

    // Load all grunt tasks.
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.initConfig({
        watch: {
            // If any .sass file changes in directory "sass" then run the "sass" task.
            files: ["sass/*.sass"],
            tasks: ["sass"]
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: false,
            },
            dist: {
                files: {
                  "styles.css": "sass/main.sass",
                },
            }
        }
    });
    // The default task (running "grunt" in console).
    grunt.registerTask("default", ["sass"]);
};
