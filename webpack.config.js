const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

    const isDev = argv.mode === 'development';

    const dest = !(process.env.NODE_ENV) ? "dist" : process.env.NODE_ENV;

    const config = {
        devtool: isDev ? 'eval-source-map' : false,
        entry: [
            './src/index.js'
        ],
        output: {
			path: path.join(__dirname, dest),
			publicPath: '/',
			filename: 'seo-checker.js',
			clean: true
        },
        module: {
            rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}]
				},
				{
					test:/\.scss$/,
					exclude: /node_modules/,
					use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
						'sass-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "autoprefixer",
                                            {
                                                "overrideBrowserslist": [
                                                    "> 0.5%",
                                                ]
                                            },
                                        ],
                                    ],
                                },
                            },
                        }
					]
				}
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "seo-checker.css"
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                inject: true
            }),
			new CopyWebpackPlugin({
				patterns: [
					{ from: path.resolve(__dirname, './src/locales'), to: path.resolve(__dirname, dest + '/locales') }
				]
			})
        ]
    };
        
    return config;
}