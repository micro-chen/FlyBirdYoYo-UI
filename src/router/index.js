//路由注册
import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve => require(['../pages/index.vue'], resolve),
      meta: {
        auth: false
      }
    },
    {
      path: '/payment',
      name: '服务续费',
      component: resolve => require(['../pages/payment/payment.vue'], resolve),
      meta: {
        auth: false
      }
    },
    {
      path: '/payrecords',
      name: '充值记录',
      component: resolve => require(['../pages/payrecords/payrecords.vue'], resolve),
      meta: {
        auth: false
      }
    },
    {
        path: '/login',
        name: '管理后台登录',
        target: "_blank",
        component: resolve => require(['../pages/admin/login/login.vue'], resolve),
        meta: {
          auth: true,
        }
      },
      {
        path: '/admin',
        name: '管理中心',
        target: "_blank",
        component: resolve => require(['../pages/admin/admin.vue'], resolve),
        meta: {
          auth: true,
        }
      },
  ]
});
