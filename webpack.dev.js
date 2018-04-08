const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

const pages = require('./pages.json');

module.exports = merge(common, {

})

let webpackConfig = {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // port: 9527,
        // host: 'localhost',
        compress: true,
        inline: true,
        hot: true
    },
}