const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const pages = require('./pages.json');

let webpackConfig = {
    entry: {
        vendor: ['bootstrap', 'jquery', ],
        commons: './src/js/commons.js',
        // entry: './src/js/entry.js',
        // one: './src/js/one.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js',
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
            }
        }, {
            test: /.art$/,
            use: ['art-template-loader']
        }]
    },
    devtool: 'eval-source-map',
    plugins: [
        // new uglify(),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, './src/*.art'),
                path.join(__dirname, './src/layout/*.art')
            ]),
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.$': "jquery",
            'window.jQuery': "jquery",

        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons', 'vendor', ],
            filename: 'assets/js/[name].[chunkhash].js',
            minChunks: 2,
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9527,
        host: 'localhost',
        compress: true
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}

// 根据pages.json内容决定生成几个文件
// 需要在对应的文件夹下新建art文件和js文件
pages.forEach(function(page) {
    const name = page.name
    const js = page.js
    if (js) {
        webpackConfig.entry[js] = `./src/js/${js}`
    }
    webpackConfig.plugins.push(
        new htmlPlugin({
            // minify: true,
            // hash: true,
            template: `./src/${name}.art`,
            filename: `${name}.html`,
            chunks: ['vendor', 'commons', js]

        })
    );
    // console.log(webpackConfig.entry)
});
module.exports = webpackConfig;