import htmlWebpackPlugin from 'html-webpack-plugin';
import webpack from'webpack';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

module.exports = {
    target: 'web',
    mode: 'production',
    devtool: false,
    plugins: [
        new nodePolyfillPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
        new htmlWebpackPlugin({
            inject: "body",
            template: 'static/index.html',
            filename: path.join(__dirname, ".tmp/static/index.html"),
            chunks: ['app'], // respective JS files
            publicPath: '/scripts/',
        }),
    ],
    resolve: {},
    module: {},
    entry: {
        app: path.resolve(__dirname, '.tmp/static/scripts/app.js'),
    },
    output: {
        path: path.resolve(__dirname, '.tmp/static/scripts'),
        filename: '[name].[contenthash].js',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 20,
            minSize: 20000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `vendor.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    }

};
