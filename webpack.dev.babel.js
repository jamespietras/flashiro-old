import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import { BundleAnalyzerPlugin as PluginAnalyzer } from 'webpack-bundle-analyzer';
import PluginHtml from 'html-webpack-plugin';
import PluginProgressBar from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

dotenv.config();

const analyzerHost = process.env.ANALYZER_HOST;
const analyzerPort = process.env.ANALYZER_PORT;
const serverHost = process.env.DEV_HOST;
const serverPort = process.env.DEV_PORT;

/* eslint-disable no-console */
const analyzerInfo = `${analyzerHost}:${analyzerPort}`;
const serverInfo = `${serverHost}:${serverPort}`;
console.log(`App available on ${chalk.green.bold(serverInfo)}`);
console.log(`Analyzer available on ${chalk.green.bold(analyzerInfo)}\n`);
/* eslint-enable no-console */

const config = {
  target: 'web',
  devtool: 'sourcemaps',
  entry: [
    `webpack-dev-server/client?http://${serverHost}:${serverPort}`,
    'webpack/hot/dev-server',
    path.join(__dirname, './src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['es2015', 'react', 'stage-1'],
            },
          },
        ],
        include: __dirname,
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: { root: '.' },
          },
          'sass-loader',
        ],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new PluginAnalyzer({
      analyzerHost,
      analyzerPort,
      logLevel: 'warn',
      openAnalyzer: false,
    }),
    new PluginHtml({
      title: 'Flashiro',
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'public/index.html'),
    }),
    new PluginProgressBar({
      clear: false,
      complete: chalk.green.bold('#'),
      format: 'Building... [:bar] :current/:total',
      incomplete: ' ',
      renderThrottle: 500,
      summary: false,
      width: 20,
    }),
  ],
};

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, 'build'),
  hot: true,
  watchContentBase: true,
  historyApiFallback: false,
  compress: true,
  clientLogLevel: 'info',
  filename: 'bundle.js',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  publicPath: '/',
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: false,
    warnings: false,
  },
});

server.listen(serverPort, serverHost, () => {});
