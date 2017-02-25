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
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: path.join(__dirname, 'cache')
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: path.join(__dirname, 'cache')
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpe?g|gif|png)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                GOOGLE_API_CLIENT_ID: JSON.stringify(process.env.GOOGLE_API_CLIENT_ID),
                FB_APP_ID: JSON.stringify(process.env.FB_APP_ID)
            }
        }),
    ],
    devtool: '#cheap-module-eval-source-map'
};
