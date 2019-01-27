const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // inline-source-map 用于开发环境
  // cheap-module-source-map 用于生产环境
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'cheap-module-source-map',

  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: './'
  },

  // 模块解析
  module: {
    // 匹配规则
    rules: [
      {
        // 使用 babel-loader 处理 .js|.jsx 文件
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 排除 node_modules 下的内容
        use: ['babel-loader']
      },

      {
        // 使用 html-loader 处理 .html 文件
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },

      {
        // 处理图片
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  // 引用插件
  plugins: [
    // 通过此插件编译html文件
    new HtmlWebpackPlugin({
      // 模板文件地址
      template: './src/index.html',
      // 输出文件名及地址
      filename: './index.html'
    }),

    // 定义 process.env.NODE_ENV 变量
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),

    function() {
      this.plugin('done', function(stats) {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log(stats.compilation.errors)
        }
      })
    }
  ],

  // 优化
  optimization: {
    namedModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // 设置别名
    alias: {
      // ~ ==> 完整的 components 路径
      '~': path.resolve(__dirname, '../src/components'),
      // @ ==> 完整的 src 路径
      '@': path.resolve(__dirname, '../src')
    }
  }
}
