let webpack = require('webpack');
let path = require('path');

let config = {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://127.0.0.1:3300',
        './src/react/'
    ],
    devServer: {
        contentBase: path.join(__dirname, './public/'),
        hot: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    output: {
        path: path.join(__dirname, './public/web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://127.0.0.1:3300/static/'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.eot', '.svg', '.ttf', '.woff', '.woff2', '.png', '.jpg'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src/react'),
                use: [
                    {
                        loader: "babel-loader",
                        query:
                            {
                                presets:['es2015', 'react']
                            }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

module.exports = config;