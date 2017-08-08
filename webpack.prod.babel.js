import chalk from 'chalk';
import path from 'path';
import PluginClean from 'clean-webpack-plugin';
import PluginExtractText from 'extract-text-webpack-plugin';
import PluginHtml from 'html-webpack-plugin';
import PluginProgressBar from 'progress-bar-webpack-plugin';
import webpack from 'webpack';

const config = {
  target: 'web',
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['es2015', 'react', 'stage-1'],
            },
          },
        ],
      }, {
        test: /\.scss$/,
        loader: PluginExtractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: { minimize: true },
            },
            {
              loader: 'sass-loader',
              options: { includePaths: ['src'] },
            },
          ],
        }),
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new PluginClean('build', { verbose: false }),
    new PluginExtractText('styles.css'),
    new PluginHtml({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'public/index.html'),
      favicon: path.join(__dirname, 'public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
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

compiler.run(() => {});
