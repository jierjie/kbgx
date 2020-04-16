import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' }, // 不能同名
    // { path: '/', redirect: { name: 'Login' } }, // 不能同名
    {
      path: '/login',
      name: 'Login',
      component: r => require(['../pages/login.vue'], r),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: r => require(['../pages/register.vue'], r),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/retrieve',
      component: r => require(['../pages/retrieve.vue'], r),
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/home',
      component: r => require(['../pages/home.vue'], r),
      meta: {
        title: ''
      }
    },
    {
      path: '/course/list',
      component: r => require(['../pages/course-list.vue'], r),
      meta: {
        title: '课程列表'
      }
    },
    {
      path: '/detail',
      component: r => require(['../pages/detail.vue'], r),
      meta: {
        title: '课程详情'
      }
    },
    {
      path: '/addcomment',
      component: r => require(['../pages/add-comment.vue'], r),
      meta: {
        title: '留言'
      }
    },
    {
      path: '*',
      redirect: '/login',
      meta: {
        title: '登录'
      }
    }
  ]
})
