const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        vendor: ['bootstrap', 'jquery', ],
        commons: './src/js/commons.js',
        entry: './src/js/entry.js',
        one: './src/js/one.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                publicPath: '../',
            }),
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]',

                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader'
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /.art$/,
            use: ['art-template-loader']
        }]
    },
    plugins: [
        // new uglify(),
        new htmlPlugin({
            // minify: true,
            template: './src/index.art',
            hash: true,
            filename: "index.html",
            chunks: ['vendor', 'commons', 'entry']

        }), new htmlPlugin({
            // minify: true,
            template: './src/one.art',
            hash: true,
            filename: "test.html",
            chunks: ['vendor', 'commons', 'one']
        }),
        new ExtractTextPlugin('css/[name].css'),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, './src/*.art'),
                path.join(__dirname, './src/layout/*.art')
            ]),
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons', 'vendor', ],
            filename: 'assets/js/[name].js',
            minChunks: 2
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9527,
        host: 'localhost',
        compress: true
    },
    devtool: 'eval-source-map',
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}