const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader/dist');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev);

const optimization = () => {
    const config = {
        splitChunks :{
            chunks :'all'
        }
    };


if (isProd) {
    config.minimizer = [
        new OptimizeCssAssetPlugin(),
        new TerserWebpackPlugin()
    ];
}
return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;


module.exports = {
    context:  path.resolve(__dirname, 'src'),
    mode:'development',
    entry: {
        main: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: filename ('js'),
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Medods project',
            template: 'index.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[ 
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
        
                    },
                },
                'css-loader'
            ]
            },
            {
                test: /\.s[ac]ss$/,
                use:[ 
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                
                    },
                },
                'css-loader',
                'sass-loader'
            ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },  
            {
                test: /\.(png|jpg|svg|gif)$/,
                use:['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                
            }
        ]
    }
};