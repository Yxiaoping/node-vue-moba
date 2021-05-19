module.exports = {
  // build 打包后输出的位置
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin' : '/'
}