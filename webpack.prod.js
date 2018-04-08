const merge = require('webpack-merge');
const common = require('./webpack.common');

const CleanWebpackPlugin = require('clean-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new uglify({
            sourceMap: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
    ],
    devtool: 'source-map',
})