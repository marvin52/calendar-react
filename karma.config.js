var path = require('path');
var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');

webpackConfig.entry = {}
webpackConfig.module.postLoaders = [{
  test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|test)/,
  loader: 'istanbul-instrumenter'
}];

module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine', 'fixture' ],
    files: [
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.spec.js'
    ],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-fixture',
      'karma-html2js-preprocessor'
    ],
    browsers: [ 'PhantomJS' ],
    preprocessors: {
      '**/*.html': ['html2js'],
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'test/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'text-summary' }
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  });
};