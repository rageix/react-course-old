import webpack from 'webpack';
import htmlBundlerWebpackPlugin from 'html-bundler-webpack-plugin';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin(),
        new htmlBundlerWebpackPlugin({
            entry: {
                // define templates here
                'index': './src/index.html',
            },
            js: {
                // output filename of JS extracted from source script specified in `<script>`
                filename: "./scripts/[name].[contenthash].js",
            },
            css: {
                // output filename of CSS extracted from source file specified in `<link>`
                filename: "./styles/[name].[contenthash].css",
            },
        }),
    ],
    entry: {},
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                    loader: 'css-loader',
                    options: {url: false}
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            "parser": false,
                            "map": false,
                            "plugins": {
                                "cssnano": {}
                            }
                        }
                    }
                }, 'sass-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
    },
    devServer: {
        port: 8080,
        host: 'localhost',
        hot: true,
        static: [
            {
                directory: path.join(__dirname, "dist"),
                publicPath: '/',
            },
            {
                directory: path.join(__dirname, 'src/images/'),
                publicPath: '/images',
            },
            {
                directory: path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'),
                publicPath: '/fonts/fontawesome6',
            },
            {
                directory: path.join(__dirname, 'src/fonts/'),
                publicPath: '/fonts',
            },
        ],
        liveReload: true,
        watchFiles: [path.join(__dirname, './src/**/*')]
    },
};
