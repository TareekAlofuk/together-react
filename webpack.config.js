'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        vendor: [
            '@babel/polyfill'
        ],
        main: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                        plugins: ['react-hot-loader/babel'],
                    },
                },
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
};