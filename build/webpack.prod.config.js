const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  // 引用插件
  plugins: [
    // new UglifyjsWebpackPlugin(),

    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '[name].js',
      chunkFilename: '[id].js'
    }),

    // 增加模块标识符
    new webpack.HashedModuleIdsPlugin(), // 推荐使用于生产环境

    // 每次打包前清理 dist 目录
    new CleanWebpackPlugin(['dist'])
  ]
})
