// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {get, post, deletes, put} from './common/http.js'
import VueAMap from 'vue-amap';
import {success_, error_} from './common/message.js'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'f55794f39e0e0385fa42fdf0beb7b4df',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.PlaceSearch', 'AMap.MapType','AMap.Geocoder', 'AMap.Autocomplete'],
})

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$deletes = deletes
Vue.prototype.$put = put

Vue.prototype.$success_ = success_
Vue.prototype.$error_ = error_

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
