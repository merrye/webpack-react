const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].js'
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

    // extract css into its own file
    // new MiniCssExtractPlugin({
    //   filename: '[name].js',
    //   chunkFilename: '[id].js'
    // }),

    // 热更新
    new webpack.HotModuleReplacementPlugin(),

    // 定义 process.env.NODE_ENV 变量
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),

    // 每次打包前清理 dist 目录
    // new CleanWebpackPlugin(['dist']),

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
    runtimeChunk: true
  },

  resolve: {
    // 设置别名
    alias: {
      // ~ ==> 完整的 components 路径
      '~': path.resolve(__dirname, 'src/components'),
      // @ ==> 完整的 src 路径
      '@': path.resolve(__dirname, 'src')
    }
  },

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
}
