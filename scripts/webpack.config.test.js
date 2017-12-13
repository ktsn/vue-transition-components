const path = require('path')
const glob = require('glob')

module.exports = {
  entry: input('**/*.ts', path.resolve(__dirname, '../test')),
  output: {
    path: path.resolve(__dirname, '../.tmp'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'] }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../test')
  }
}

function input(pattern, cwd) {
  const files = glob.sync(pattern, { cwd })
  const res = {}
  files.forEach(file => {
    res[file.split('.').slice(0, -1).join('.')] = path.resolve(cwd, file)
  })
  return res
}