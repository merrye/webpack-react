const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
  // 模块解析
  module: {
    // 匹配规则
    rules: [
      {
        // 处理 sass-loader 等多个loader 处理 .scss 文件
        // 使用scss
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  // 引用插件
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),

    // 开发环境引入 mock
    new webpack.DefinePlugin({
      MOCK: true
    }),

    // 增加模块标识符
    new webpack.NamedModulesPlugin() // 推荐使用于开发环境
  ],

  // 开启 webpack-dev-server
  devServer: {
    hot: true,
    host: 'localhost',
    compress: true,
    publicPath: '/',
    // 不开启的情况下 当你访问的网址不是 localhost:8080/ 时，点击刷新后，会出现404
    // 因为dist文件夹里面没有 除了 index.html 之外的 html 文件
    // 当使用 HTML5 History API 时, 必须提供 index.html 页面来代替任何404响应
    historyApiFallback: true
  }
})
