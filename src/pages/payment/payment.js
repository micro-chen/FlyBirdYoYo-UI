//导入页面依赖的资源
import config from "../../etc/config.js";
import appCore from "../../utils/applicationCore.js";
import cacheHelper from "../../utils/webcache.js";
import cookieHelper from "js-cookie";
import httpClient from "axios";



//Page 的事件方法绑定
export default {

  //页面数据模型  
  data() {
    return {
      moneyPerMonty: 15,//默认价格
      
      serviceItems: [{
          Name: "一个月",
          Value: 1,
          Selected: "select"
        },
        {
          Name: "三个月",
          Value: 3,
          Selected: ""
        },
        {
          Name: "半年",
          Value: 6,
          Selected: ""
        },
        {
          Name: "一年",
          Value: 12,
          Selected: ""
        },
      ],

      orderModel: {
        ShopName: "你的店铺",
        ProductName: "快鸟YoYo",
        TimeCycleType: 1,
        CycleDescption: "一个月",
        BeginTime: new Date().Format("yyyy-MM-dd"),
        EndTime: new Date().addDays(30).Format("yyyy-MM-dd"),
        Price: 0,
      },

    };
  },



  // vue 中的自定义事件方法在 `methods` 对象中定义方法
  methods: {


    //your code functions
    /*初始化页面 */
    initPage: function () {
      console.log("initPage");
      var that = this;
      that.orderModel.Price=that.moneyPerMonty;//默认为当前单月价格
      that.loadServicePriceHandler();
    },

    /*加载服务单价*/
    loadServicePriceHandler: function () {
      console.log("loadServicePriceHandler...");
      var that = this;

      //发起http请求
      var url = config.basePath + "/PaymentOrder/loadServicePriceHandler";
      var paras = null;
      httpClient.get(url, paras).then(function (response) {

        if (!response || response.IsSuccess === false) {
          console.log("加载服务单价数据出现故障！请刷新页面！");
          return;
        }
        //debugger
        that.moneyPerMonty = response.Data; //返回的响应数据
        that.orderModel.Price = that.moneyPerMonty;

      });

    },

    selectServiceTimeHandler: function (num) {
      console.log("selectServiceTimeHandler...");
      var that = this;
      var itemService = this.serviceItems.find(x => x.Value == num);
      //选中当前
      itemService.Selected = "select";
      this.serviceItems.where(x => x.Value != num).forEachElement(function (item) {
        item.Selected = "";
      });

      this.orderModel.TimeCycleType = num;
      this.orderModel.CycleDescption = itemService.Name;
      this.orderModel.EndTime = new Date().addDays(num * 30).Format("yyyy-MM-dd");
      this.orderModel.Price = this.moneyPerMonty * num; //单价*数目
     
      //控制选中

    },

    gotoBuyHandler: function () {
      console.log("gotoBuyHandler...");
      var that = this;
      $("#contentMain").hide();
      $("#contentOrder").show();

    },
    /*提交订单*/
    submitOrderHandler: function () {
      console.log("submitOrderHandler...");
      var that = this;

      //弹出加载提示
      appCore.MessageBox.loading();
      //发起http请求
      var url = config.basePath + "/PaymentOrder/CreateOrder";
      var paras = this.orderModel;
      httpClient.post(url, paras).then(function (response) {

        appCore.MessageBox.closeLoading();

        if (!response || response.IsSuccess === false) {
          console.log("加载快递单发件人数据出现故障！请刷新页面！");
          return;
        }
        //debugger
        var data = response.Data; //返回的响应数据d
         
        if (data.Status == true && !appCore.isNullOrEmpty(data.PaymentUrl)) {

         var paymentUrl = data.PaymentUrl;
         
         //创建A元素，自动点击打开新的付款页面
         var domPaymentButton = document.createElement("a");
         document.body.appendChild(domPaymentButton);
         domPaymentButton.href = paymentUrl; //url 是你得到的连接
         domPaymentButton.target = '_blank'; //指定在新窗口打开
         domPaymentButton.click();
         document.body.removeChild(domPaymentButton);
          //跳转打开新的tab
          ///window.open(paymentUrl, '_blank');
          //this.paymentUrl= data.PaymentUrl;
        } else {
          appCore.MessageBox.error("提交订单付费失败！请重试！")
        }

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
  components: {}
};
