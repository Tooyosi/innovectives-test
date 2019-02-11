require('dotenv').config();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: process.env.NODE_ENV,
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/docs`,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpege: {
                                progressive: true,
                                quality: 80,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/template.html',
        }),
        new webpack.EnvironmentPlugin(['development']),
      ],
};

module.exports = config;