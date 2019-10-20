import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import {success_, error_, MessageConfirm} from '@/utils/message.js'
import VueAMap  from 'vue-amap';  //注意不要和 AMap原始名称覆盖

import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(VueAMap);
// // 初始化vue-amap
// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: 'you key',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
//   v: '1.4.4'
// });


Vue.prototype.$success_ = success_
Vue.prototype.$error_ = error_
Vue.prototype.baseURL = process.env.NODE_ENV
Vue.prototype.$messageConfirm = MessageConfirm


// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
