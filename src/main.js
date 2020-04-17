// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'vant/lib/index.css'
import 'video.js/dist/video-js.css'
import '@/assets/css/base.css'
import '@/utils/rem.js'
import '@/assets/icon/iconfont.css'

// 微信分享
import WXConfig from '@/utils/wx.jsapi' // 微信分享
Vue.prototype.WXConfig = WXConfig

import {
  Checkbox,
  Popup,
  Picker,
  Area,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Icon
} from 'vant'
Vue.config.productionTip = false

Vue.use(Checkbox)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Area)
Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Icon)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    window.scrollTo(0, 0)
  }
  next()
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
