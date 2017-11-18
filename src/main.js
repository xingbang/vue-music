import 'babel-polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'

fastclick.attach(document.body)
Vue.use(VueResource)
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
