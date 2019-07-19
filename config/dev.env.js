'use strict'

const merge = require('webpack-merge')
const common = require('../vue.config')
process.env.NODE_ENV = 'development'

module.exports = merge(common, {
    NODE_ENV: "development",
    API_ROOT: "127.0.0.1/api", //接口路径
    devServer: {
        proxy: {
          '/api': {
            target: defaultSettings.AdminApiUrl + '/admin',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },
    },
})