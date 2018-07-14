const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
    // const PurifyCSSPlugin = require('purifycss-webpack');
    // const glob = require('glob-all');

const pages = require('../pages/pages.json');

let webpackConfig = {
    entry: {
        // vendor: ['bootstrap', 'jquery','element-ui','vue', ],
        commons: ['./src/js/commons.js'],
        // tree: './src/js/tree.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
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
            test: /\.ejs$/,
            use: {
                loader: 'ejs-render-loader'
            }
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
        }),
        new CopyWebpackPlugin([{
            from: './static',
            to: 'static'
        }])
    ],
    // 不希望被打包的库（可以通过CDN或者后期手动script的方式引入）
    // 可以减小打包出来的体积
    externals: {
        jquery: '$',
        vue: 'Vue',
        echarts: 'echarts'
    },
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
            template: `./src/${name}.ejs`,
            filename: `${name}.html`,
            chunks: ['commons', 'tree', js]

        })
    );
});
module.exports = webpackConfig;