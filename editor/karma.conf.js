var webpackConfig = require('./webpack.config')
delete webpackConfig['entry']
webpackConfig['node'] = {
  // handles stack-utils looking for 'module'
  module: 'empty',
}
module.exports = function (config) {
  config.set({
    plugins: ['karma-webpack', 'karma-mocha', 'karma-chrome-launcher'],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browserNoActivityTimeout: 1000000,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],
    webpack: webpackConfig,

    // list of files / patterns to load in the browser
    files: [
      './karma-setup.js',
      './src/**/*.spec.browser2.+(ts|tsx)',
      {
        pattern: './resources/editor/icons/**/*.png',
        watched: false,
        served: true,
        included: false,
        nocache: false,
      },
    ],
    proxies: {
      '/editor/icons': '/base/resources/editor/icons',
    },

    browsers: ['ChromeHeadless'],
    // browsers: ['Chrome'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Use webpack to bundle our tests files
      './karma-setup.js': ['webpack'],
      './src/**/*.ts': ['webpack'],
      './src/**/*.tsx': ['webpack'],
    },
    client: {
      mocha: {
        timeout: 10000,
      },
    },
  })
}
