var argv = require('yargs').argv
var path = require('path')
var webpack = require('webpack')
var CommonsChunkPlugin = require(__dirname + '/node_modules/webpack/lib/optimize/CommonsChunkPlugin')

// Create plugins array
const plugins = [
  new CommonsChunkPlugin('commons.js')
]

// Add Uglify task to plugins array if there is a production flag
if (argv.production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: {
    home: __dirname + '/src/js/app-home',
    blog: __dirname + '/src/js/app-blog',
    pledgeYourSupport: __dirname + '/src/js/app-pledgeYourSupport',
    viewYourPledge: __dirname + '/src/js/app-viewYourPledge',
    joinActionGroup: __dirname + '/src/js/app-joinActionGroup',
    progress: __dirname + '/src/js/app-latestNews',
    actionGroups: __dirname + '/src/js/app-actionGroups'
  },
  output: {
    path: path.join(__dirname, '/_dist/assets/js/'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: 'assets/js/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  standard: {
    parser: 'babel-eslint'
  }
}
