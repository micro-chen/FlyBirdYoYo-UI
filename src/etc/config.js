import appCore from "../utils/applicationCore.js";
import cacheHelper from '../utils/webcache.js';
import Cookies from 'js-cookie';
import httpClient from "axios";


var _configModule = {

  getToken: function () {
    //  console.log(Cookies.get(".auth.token"));
    return Cookies.get(".auth.token");
  }, //用户登录后的授权
  setToken: function (tk) {
    cacheHelper.set("token", tk, {
      exp: 60 * 60 * 15
    }); //设定用户token有效期为15h
  },
  removeToken: function () {
    cacheHelper.delete('token');
  },
  getPlatform:function(){
    var currentUser=this.getUser();
    if(currentUser){
      return currentUser.Platform;
    }

    return -1;
  },
  getUser: function () {
    // console.log(Cookies.get(".login.user"));
    // console.log(decodeURIComponent(Cookies.get(".login.user")));

    var user = Cookies.get(".login.user");
    if (appCore.isNullOrEmpty(user)) {
      return null;
    } else {
      return JSON.parse(decodeURIComponent(Cookies.get(".login.user")));
    }
    // var user = 
    // console.log(user);
    // return user;
  },

  //获取全局全部省市地区--示范同步请求数据
  getAllProvinceCityList: function () {
    var that = this;
    var dataList = cacheHelper.get("allProvinceCityList", 60 * 60 * 12, function () {

      //发起http同步请求
      var url = that.basePath + "/ProvinceCity/GetAllProvinceCityList";
      var paras = null;

      appCore.HttpRequest.getSync(url, paras, function (response) {

        if (response && response.IsSuccess === true) {
          dataList = response.Data;
        }
      });

      return dataList;
    });


    return dataList;
  },

  // 本地模拟环境
  basePath: 'http://localhost:8003/api',
  domain: 'http://localhost:8003',
  login_url: 'http://localhost:8008/#login',
  // 线上环境Path:
  //basePath: 'http://api.flybirdyoyo.com/api',
  //domain: 'http://www/flybirdyoyo.com',


};

export default _configModule;
