"use strict";

const path = require('path');
const sass = require('sass');
const webpackConfig = require('./webpack.config.js');
const webpackProductionConfig = require('./webpack.production.js');

var babelRename = function(destPath, srcPath) {
    destPath = srcPath.replace('src', 'build');
    destPath = destPath.replace('.js', '.min.js');
    return destPath;
};


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
            files: ["src/**/*.ts", "sass/*.sass"],
            tasks: ["webpack:dev", "webpack:prod", "sass"]
        },
        eslint: {
            options: {
                quiet: true,
                maxWarnings: -1,
                overrideConfig: {
                    rules: {
                        'no-tabs': 0,
                        'curly': 0,
                        'no-undef': 0,
                        'no-unused-vars': 0,
                        'max-len': 0,
                        'babel/no-unused-expressions': 0,
                        'wrap-iife': 0,
                        'babel/semi': 0,
                        'no-console': 0,
                        'no-eq-null': 0,
                        'no-new-wrappers': 0,
                        'no-return-assign': 0,
                        'no-cond-assign': 0,
                        'no-bitwise': 0,
                        'no-labels': 0,
                        'no-func-assign': 0,
                        'no-unmodified-loop-condition': 0,
                        'valid-typeof': 0,
                        'no-self-compare': 0,
                        'no-fallthrough': 0
                    }
                }
            },
            amd: { 
                src: [path.resolve(__dirname, "amd/src/*.js")] 
            }
        },
        babel: {
            options: {
                sourceMaps: false,
                comments: false,
                plugins: [
                    'transform-es2015-modules-amd-lazy',
                    'system-import-transformer'
                ],
                presets: [
                    ['minify', {
                        // This minification plugin needs to be disabled because it breaks the
                        // source map generation and causes invalid source maps to be output.
                        simplify: false,
                        builtIns: false
                    }],
                    ['@babel/preset-env', {
                        targets: {
                            browsers: [
                                ">0.25%",
                                "last 2 versions",
                                "not ie <= 10",
                                "not op_mini all",
                                "not Opera > 0",
                                "not dead"
                            ]
                        },
                        modules: false,
                        useBuiltIns: false
                    }]
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    src: path.resolve(__dirname, "amd/src/index.js"),
                    rename: babelRename
                }]
            }
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
        },
        webpack: {
            prod: webpackProductionConfig,
            dev: webpackConfig,
        }
    });
    // The default task (running "grunt" in console).
    grunt.registerTask("default", ["webpack", "sass"]);
    grunt.loadNpmTasks('grunt-webpack');
};
