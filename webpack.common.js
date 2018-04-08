const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');
// const glob = require('glob-all');

const pages = require('./pages.json');

let webpackConfig = {
    entry: {
        // vendor: ['bootstrap', 'jquery','element-ui','vue', ],
        commons: ['./src/js/commons.js'],
        // tree: './src/js/tree.js',
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
                    limit: 10000,
                    name: 'images/[name].[ext]?[hash]',

                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 10000,
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
    plugins: [
        // 全局配置jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.$': "jquery",
            'window.jQuery': "jquery",
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons', ],
            filename: 'assets/js/[name].[chunkhash].js',
            minChunks: 2,
        })
    ],

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
            chunks: ['commons', 'tree', js]

        })
    );
});
module.exports = webpackConfig;