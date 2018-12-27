//导入页面依赖的资源
import config from "../../etc/config.js";
import appCore from "../../utils/applicationCore.js";
import cacheHelper from "../../utils/webcache.js";
import cookieHelper from "js-cookie";
import httpClient from "axios";
//组件
//左侧导航
import NavbarOfAdmin from "@/components/NavbarOfAdmin.vue";



//Page 的事件方法绑定
export default {

  //页面数据模型  
  data() {
    return {


      isTabCloseble: false,
      editableTabsValue: 'studentManage', //当前选中的tab name
      //显示的tabs--默认有一个tab
      editableTabs: [{
        title: '学生管理',
        name: 'studentManage',
        content: '',
        component: 'studentManage',
        close: false
      }],
    };
  },



  // vue 中的自定义事件方法在 `methods` 对象中定义方法
  methods: {

    /*接收处理子组件--菜单组件发送的菜单变更消息*/
    invokeNavMenuChangdAtParent: function (menuItem) {

      console.log("invokeNavMenuChangdAtParent");

      this.addTabHandler(menuItem.page, menuItem.label);
    },
    /*当tabs 数量变更时*/
    onTabsChange: function () {
      console.log("onTabsChange");

    },
    /*切换tab*/
    beforeLeaveTabHandler(activeName, oldActiveName) {

      //debugger
      console.log("beforeLeaveTabHandler");

      //向子组件-导航栏发送消息，选中特定的菜单
      this.$refs.navbar.fromParentTabHandleClick(activeName, oldActiveName)


    },


    /*添加tab*/
    addTabHandler(pageName, pageLabel) {
      var that = this;

      //根据菜单名称判断是否已经加载到tabs
      var idx = that.editableTabs.findIndex(function (x) {
        if (x.name == pageName) {
          return true;
        }
      });
      if (idx >= 0) {
        that.editableTabsValue = pageName; //设置选中的tab值--name
        return;
      }


      //如果不存在，那么新建

      that.editableTabs.push({
        title: pageLabel,
        name: pageName,
        content: "",
        component: pageName,
        close: true
      });
      that.editableTabsValue = pageName;

      that.onTabsChange();


    },
    /*移除tab*/
    removeTabHandler(targetName) {
      var that = this;
      var tabs = that.editableTabs;


      var activeName = that.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }


      that.editableTabsValue = activeName;
      that.editableTabs = tabs.findAll(tab => tab.name !== targetName);
      that.onTabsChange();
    },

    /*布局自适应*/
    resizeHandler: function () {
      //console.log("4")
      var wrapperHeight = $(window).height() - 20;
      var height = (wrapperHeight + "px");
      $(".content").css("height", height);
      $(".content-left").css("height", height);
      $(".content-right").css("height", height);
      $(".el-tabs__content").css("height", (wrapperHeight - 60) + "px");

    },
    logoutHandler: function () {
      console.log("logoutHandler");
      var that = this;

      //发起http请求
      var url = config.basePath + "/Account/Logout";
      var paras = null;
       
       
      httpClient.get(url, paras).then(function (response) {

        that.$router.push({
          path: '/login'
        })
  
      });

    
    }

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

    //注册窗口变更 进行自适应
    $(window).resize(function () {
      that.resizeHandler();
    });

    that.resizeHandler();
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
    NavbarOfAdmin: NavbarOfAdmin,
    //异步加载组件
    shopManage: () => import("./studentManage/studentManage.vue"),
  }
};
