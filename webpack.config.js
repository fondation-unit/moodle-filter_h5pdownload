const path = require("path");
const webpack = require("webpack");
const glob = require("glob");

const config = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        library: 'index',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'amd/src'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
				test: /\.ts(x)?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            }
        ]
    },
    resolve: {
        alias: {
            // Make aliases for AMD core libraries
            "core": path.resolve(__dirname, "../../lib/amd/src"),
            // Find the lib/jquery JS file
            "jquery": path.resolve(__dirname, glob.sync("../../lib/jquery/*.min.js")[0])
        }
    }
};

module.exports = () => {
    config.mode = 'production';
    return config;
};
