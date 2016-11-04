var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
        polyfill: ['babel-polyfill'],
        common: ['firebase', 'react']
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'var'
    },
    plugins: [
        new ExtractTextPlugin(
            '[name].css'
        ),
        new HtmlWebpackPlugin({
            title: 'goose',
            chunks: ['app', 'polyfill', 'common'],
            template: 'index.html'
        })
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader' +
                    'postcss-loader' +
                    'sass-loader' +
                    'includePaths[]' + __dirname + './node_modules'
                )
            }
        ]
    }
};

