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
        title: ' '
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
      path: '/exam',
      component: r => require(['../pages/exam.vue'], r),
      meta: {
        title: '考试'
      }
    },
    {
      path: '/exam/result',
      component: r => require(['../pages/exam-result.vue'], r),
      meta: {
        title: '查看成绩'
      }
    },
    {
      path: '/score',
      component: r => require(['../pages/score.vue'], r),
      meta: {
        title: '积分页面'
      }
    },
    {
      path: '/score/detail',
      component: r => require(['../pages/score-detail.vue'], r),
      meta: {
        title: '积分明细'
      }
    },
    {
      path: '/ops/opsbychen',
      component: r => require(['../pages/opsbychen.vue'], r),
      meta: {
        title: '运维'
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
