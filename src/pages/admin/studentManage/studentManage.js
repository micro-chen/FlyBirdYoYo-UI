//导入页面依赖的资源
import config from "../../../etc/config.js";
import appCore from "../../../utils/applicationCore.js";
import cacheHelper from "../../../utils/webcache.js";
import cookieHelper from "js-cookie";
import httpClient from "axios";
//组件


//Page 的事件方法绑定
export default {

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  //页面数据模型  
  data() {
    return {
      conditonModel: {
        platform: 0,
        keyWord: '',
        pageNumber: 1, //页码 1开始
        pageSize: 10,
        total: 0
      },
      listPlatforms: [{
        value: 0,
        label: "全部"
      }, ],
      listShops: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },


  // vue 中的自定义事件方法在 `methods` 对象中定义方法
  methods: {
    initPage: function () {
      this.loadSupportPlatformsListHandler();
      this.loadShopListHandler();

    },
    loadSupportPlatformsListHandler: function () {
      console.log("loadSupportPlatformsListHandler...");
      var that = this;
      //发起http请求
      var url = config.basePath + "/admin/loadSupportPlatformsListHandler";
      var paras = null;
      httpClient.get(url, paras).then(function (response) {
        if (!response || response.IsSuccess === false) {
          console.log("加载支持平台数据出现故障！请刷新页面！");
          return;
        }
        //debugger
        if(response.Data.length>0){
          that.listPlatforms.addRange( response.Data); //返回的响应数据
        }
 
      });

    },

    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.conditonModel.pageSize = size;
      this.loadShopListHandler();
    },
    handleCurrentChange(pageNo) {
      console.log(`当前页: ${pageNo}`);
      this.conditonModel.pageNumber = pageNo;
      this.loadShopListHandler();
    },
    loadShopListHandler: function () {
      console.log("loadShopListHandler...");
      var that = this;

      //发起http请求
      var url = config.basePath + "/admin/GetUserShopInfoList";
      var paras = this.conditonModel;
       
      appCore.MessageBox.loading();
      httpClient.post(url, paras).then(function (response) {

        appCore.MessageBox.closeLoading();
        if (!response || response.IsSuccess === false) {
          console.log("加载店铺列表数据出现故障！请刷新页面！");
          return;
        }
        //debugger
        that.listShops = response.Data; //返回的响应数据
        that.conditonModel.total=response.PagerInfomation.TotalElements;


      });
    },
    /** 进入指定店铺*/
    enterShopHandler:function(shopUrl){
      console.log("enterShopHandler...");
      var that = this;

       if(appCore.isNullOrEmpty(shopUrl)){
         return;
       }
         
      //创建A元素，自动点击打开新的付款页面
      var domEnterShopButton = document.createElement("a");
      document.body.appendChild(domEnterShopButton);
      domEnterShopButton.href = shopUrl; //url 是你得到的连接
      domEnterShopButton.target = '_blank'; //指定在新窗口打开
      domEnterShopButton.click();
      document.body.removeChild(domEnterShopButton);
       //跳转打开新的tab
       ///window.open(shopUrl, '_blank');
       //this.shopUrl= data.shopUrl;
     
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
    console.log("shopManage mounted");
    var that = this;
    this.initPage();
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
