'use strict'

const merge = require('webpack-merge')
const common = require('../vue.config')
process.env.NODE_ENV = 'production'

module.exports = merge(common, {
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