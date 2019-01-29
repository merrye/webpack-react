const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
        include: path.resolve(__dirname, '../src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  // 引用插件
  plugins: [
    // new UglifyjsWebpackPlugin(),

    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '/static/css/[name].css',
      chunkFilename: '/static/css/[id].css'
    }),

    // 增加模块标识符
    new webpack.HashedModuleIdsPlugin(), // 推荐使用于生产环境

    // 每次打包前清理 dist 目录
    // 不把 root 路径指向 process.cwd() ，会造成删除 build/dist 文件夹的错误操作
    // 如果直接设置成 path.join(__dirname, '../dist) 会因为路径 outside of the project root 跳过清空文件夹操作
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),

    /**
     * 开启 gzip 压缩
     *
     * asset 目标资源名称。 默认为 [path].gz[query]
     *  [file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
     * algorithm 采用的算法 默认为 gzip
     * test 处理所有匹配此 {RegExp} 的资源
     */
    new CompressionWebpackPlugin({
      // asset: '[path].gz[query]'
      // algorithm: 'gzip',
      test: /\.(js|css)$/
    }),

    new ParallelUglifyPlugin({
      workerCount: 4,
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../src'),
      uglifyES: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 保留注释
        },
        compress: {
          // 压缩
          warnings: false, // 删除无用代码时不输出警告
          drop_console: true, // 删除console语句
          collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),

    // 对打包后的代码进行分析
    new BundleAnalyzerPlugin()
  ]
})
