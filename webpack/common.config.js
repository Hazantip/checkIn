// webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {

  entry: {
    'app': [
      './src/main.js'
    ],
    'vendor': './src/vendor.js'
  },

  resolve: {

    extensions: ['.js', '.scss'],

    modules: ['node_modules'],

    alias: {
      vue: 'vue/dist/vue.js',
      VueTouch: 'vue-touch/dist/vue-touch.js'
    }

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },

      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file',
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }

    ]

  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity
    })
  ]

};