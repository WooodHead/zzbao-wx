// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import {LoadingPlugin, ToastPlugin} from 'vux'
import VueLazyload from 'vue-lazyload'
import VueHead from 'vue-head'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
Vue.use(LoadingPlugin)
FastClick.attach(document.body)
// import { InfiniteScroll } from 'mint-ui'
// Vue.use(InfiniteScroll)
// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
Vue.config.productionTip = false
// Vue.use(WechatPlugin)
Vue.use(VueResource)
Vue.use(VueHead)
Vue.use(ToastPlugin)
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
