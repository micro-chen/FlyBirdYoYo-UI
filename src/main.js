//vue 模板启动入口
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from "./etc/config.js";
import appCore from "./utils/applicationCore.js";
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import $ from 'jquery'

import axios from "axios";
axios.defaults.timeout = 60000 * 30;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.basePath;
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么 
    if (response.status == 200) {
        if (response.data.Status == 4000) { //没有权限或者COOKIE过期
            window.location.href = config.login_url;
            return;
        }
    }
    return response.data;

}, function(error) {
    return Promise.reject(error);
});
Vue.prototype.$http = axios;

import store from './store'

import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';
import { Notification } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false


window.Promise = Promise;

//注册全局扩展
appCore.exten();
appCore.MessageBox.winMessage = Message;
appCore.MessageBox.winLoading = Loading;
appCore.MessageBox.winMessageBox = MessageBox;
appCore.MessageBox.winNotification = Notification;
window.appCore = appCore;


import router from './router'

router.beforeEach((to, from, next) => {
        if (to.name) {
            document.title = to.name + ' ---【快鸟打印】-电商面单打印专家';
        }
       
        //  console.log(this.loginUser);
        if (to.matched.some(m => m.meta.auth)) {
            if(to.meta.auth==true){
                next();
                return;//登陆后台管理 不用Token
            }

            var token = config.getToken();
            //--推荐使用全局扩展函数。简明开发
            if (appCore.isNullOrEmpty(token)) {
                window.location.href = config.login_url;
            } else {
                next();
            }
            //验证登录

        } else {
            next();
        }
    }

);

/* 注册一个vue 实例
eslint-disable no-new */
var app = new Vue({
    el: '#app',
    store,
    components: {
        App
    },
    template: '<App/>',
    router
});