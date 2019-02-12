const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')

// 根据系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  mode: process.env.NODE_ENV,

  // inline-source-map 用于开发环境
  // cheap-module-source-map 用于生产环境
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'cheap-module-source-map',

  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  },

  // 模块解析
  module: {
    // 匹配规则
    rules: [
      {
        // 使用 babel-loader 处理 .js|.jsx 文件
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 排除 node_modules 下的内容
        include: path.resolve(__dirname, '../src'),
        // loader: 'babel-loader?cacheDirectory'
        use: 'happypack/loader?id=babel'
      },

      {
        // 使用 html-loader 处理 .html 文件
        test: /\.html$/,
        include: path.resolve(__dirname, '../src'),
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
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/img/[name].[hash:7].[ext]'
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

    new HappyPack({
      // 基础参数设置
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      verbose: true
    }),

    // 定义 process.env.NODE_ENV 变量
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
  ],

  // 优化
  optimization: {
    namedModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },

        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },

        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
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
