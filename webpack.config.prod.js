var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
/*var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin*/
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.js',
        polyfill: ['babel-polyfill'],
        common: ['firebase', 'react']
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        libraryTarget: 'var'
    },
    plugins: [
        new ExtractTextPlugin(
            '[name].css'
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new HtmlWebpackPlugin({
            title: 'goose',
            chunks: ['app', 'polyfill', 'common'],
            template: 'index.html'
        })/*,
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 3000,
            reportFilename: 'report.html',
            openAnalyzer: true,
            generateStatsFile: true,
            statsFilename: 'stats.json'
        })*/
    ],
    module: {
        /*preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],*/
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

