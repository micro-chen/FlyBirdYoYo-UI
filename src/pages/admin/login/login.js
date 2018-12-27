//导入页面依赖的资源
import config from "../../../etc/config.js";
import appCore from "../../../utils/applicationCore.js";
import cacheHelper from "../../../utils/webcache.js";
import cookieHelper from "js-cookie";
import httpClient from "axios";
import {
  TabPane
} from "element-ui";
//组件


//Page 的事件方法绑定
export default {

  //页面数据模型  
  data() {
    const validateUserName = (rule, value, callback) => {
      if (appCore.isNullOrEmpty(value)) {
        callback(new Error('用户名不能为空！'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error('密码不能为空，不可少于6个字符！'))
      } else {
        callback()
      }
    }

    return {

      loginForm: {
        UserName: '',
        Pwd: null,
        CheckCode: null,
        Sign: null,
      },
      loginRules: {
        UserName: [{
          required: true,
          trigger: 'blur',
          validator: validateUserName
        }],
        Pwd: [{
          required: true,
          trigger: 'blur',
          validator: validatePwd
        }]
      },
      PwdType: 'password',
      loading: false,
      diaLoading:false,
      showDialog: false,
      redirect: null
    };
  },



  // vue 中的自定义事件方法在 `methods` 对象中定义方法
  methods: {
    showPwd() {
      if (this.PwdType === 'password') {
        this.PwdType = ''
      } else {
        this.PwdType = 'password'
      }
    },

    onShowDialogDynamicHandler:function(){
      console.log("onShowDialogDynamicHandler...");
      var that = this;

      that.loginForm.CheckCode="";
    },
     /**验证动态口令 */
    loginByDynamicCodeHandler:function(){
      console.log("loginByDynamicCodeHandler...");
      var that = this;

      if(appCore.isNullOrEmpty(that.loginForm.CheckCode)){
        appCore.MessageBox.toast("口令不能为空！");
        return;
      }
      if(!appCore.isNumberString(that.loginForm.CheckCode)){
        appCore.MessageBox.toast("口令格式错误！");
        return;
      }  
      that.diaLoading = true;


          //发起http请求
          var url = config.basePath + "/Account/LoginCheckDyCode";
          var paras = that.loginForm;



          httpClient.post(url, paras).then(function (response) {

            that.diaLoading = false

            var errMsg ="验证口令失败！";
            if (!response || response.IsSuccess === false) {
              if(!appCore.isNullOrEmpty(response.Msg)){
                errMsg=errMsg+"失败原因："+response.Msg;
              }
              appCore.MessageBox.toast(errMsg);
              return;
            }

           
            var data = response.Data; //返回的响应数据
            if (!data) {
              appCore.MessageBox.toast(errMsg);
              return;
            }
            debugger
            
            //动态口令验证成功，那么进入系统管理
            that.showDialog=false;
            //todo:进入系统
            that.$router.push({ path: that.redirect || '/admin' })
          });


    },
    /**验证用户名密码 */
    loginHandler() {
      console.log("loginHandler...");
      var that = this;

     
      if(that.showDialog){//已经弹窗口令验证不再提交密码验证
        return;
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true;


          //发起http请求
          var url = config.basePath + "/Account/LoginCheckUser";
          var paras = that.loginForm;



          httpClient.post(url, paras).then(function (response) {

            that.loading = false

            if (!response || response.IsSuccess === false) {
              appCore.MessageBox.error("登录出现故障！请尝试从新登录或联系管理员！");
              return;
            }

            //debugger
            var data = response.Data; //返回的响应数据
            if (!data.IsSuccess || appCore.isNullOrEmpty(data.Sign)) {
              var errMsg = "登录出现故障！";
              if (data.Message) {
                errMsg = errMsg + "错误原因: " + data.Message;
              }
              appCore.MessageBox.error(errMsg);
              return;
            }

            that.loginForm.Sign = data.Sign; //保存签名

            //显示动态口令输入
            that.showDialog = true;

          });

          /*this.$store.dispatch('LoginByUserName', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })*/



        } else {
          console.log('登录异常!')
          return false
        }
      })
    },
  },
  //-------vue生命周期函数-begin------------
  /*创建前*/
  beforeCreate: function () {
    //console.log("beforeCreate");
  },
  /*创建后*/
  created: function () {
    //console.log("created");
  },
  /*载入前*/
  beforeMount: function () {
    //console.log("beforeMount");
  },
  /*载入后*/
  mounted: function () {
    console.log("mounted");
    var that = this;

  },
  /*更新前*/
  beforeUpdate: function () {},
  /*更新后*/
  updated: function () {},
  /*销毁前*/
  beforeDestroy: function () {},
  /*销毁后*/
  destroyed: function () {},

  //-------vue生命周期函数-end------------
  /*页面组件*/
  components: {

  }
};
