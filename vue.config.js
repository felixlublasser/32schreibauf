module.exports = {
  chainWebpack: config => config.plugins.delete('named-chunks')
}
