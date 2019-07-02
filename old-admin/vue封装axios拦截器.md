# vue封装axios拦截器

## 相关文章阅读

- [vue cli+axios踩坑记录+拦截器使用，代理跨域proxy](https://www.cnblogs.com/horanly/p/7771118.html)

- [axios在线文档](https://www.kancloud.cn/yunye/axios/234845)


## 导读: 

> 1 为什么要使用拦截器, 举个最简单的例子来说, 后台管理的登录用户token随时会过期, 我们需要每次请求都检测一下是否过期,是否需要更新token,又或者是否请求失败了,需要进行全局跳转, 而不是在每次组件中请求的时候去判断

> 2 响应拦截器, 在响应后端数据的过程中,将数据转化为自己喜欢的数据即可


## 开发配置

### 配置跨域处理


1) 打开 build.js

修改 `process.env.NODE_ENV = 'production'`

2) 打开config/index.js

修改跨域重定向地址

    ...
    module.exports = {
        dev: {
            dev: require('./dev.env'),
            // Paths
            assetsSubDirectory: 'static',
            assetsPublicPath: '/',
            autoOpenBrowser: true,
            proxyTable: {
            '/api' : {
                target: 'http://store.ink', // 目标请求的地址
                changeOrigin: true, // 是否开启跨域请求
                pathRewrite: {
                '^/api': '/admin'  // 地址栏重写
                }
            }
            },

    ....

3) 添加生产环境配置文件和开发环境配置文件

dev.env.js 


