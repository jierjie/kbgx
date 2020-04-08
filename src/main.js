// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'vant/lib/index.css'
import '@/assets/css/base.css'
import '@/utils/rem.js'
import '@/assets/icon/iconfont.css'
import {
  Button,
  Checkbox,
  Form,
  Field,
  Popup,
  Picker,
  Notify,
  Area,
  Toast
} from 'vant'
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Notify)
Vue.use(Area)
Vue.use(Toast)
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
