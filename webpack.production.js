const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    entry: {
        index: './src/index.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/index.js'),
                    to: path.resolve(__dirname, 'javascript/index.min.js')
                }
            ]
        })
    ]
};

module.exports = () => {
    config.mode = 'production';
    return config;
};
