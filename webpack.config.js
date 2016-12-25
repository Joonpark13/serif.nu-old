const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'app/index.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpe?g|gif|png)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
