// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import './assets/font/iconfont.css'
import VueAMap from 'vue-amap'

Vue.use(Mint)
VueAMap.initAMapApiLoader({
  key: '406278ec71fb5575c04636468ed09e8a',
  plugin: ['AMap.Geolocation']
})
Vue.use(VueAMap)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
