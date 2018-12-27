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

      pickerOptions2: {
        shortcuts: [{
          text: '最近一月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30*3);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30*6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateRange: [new Date().addMonths(-3), new Date().getTodayEnd()],//最近3个月的充值记录
     

      conditonModel: {
        orderId: null,
        beginTime: null,
        endTime: null,
        pageNumber:1, //页码 1开始
        pageSize: 10,
        total:0
      },
      orderList: [],

    };
  },



  // vue 中的自定义事件方法在 `methods` 对象中定义方法
  methods: {


    //your code functions
    /*初始化页面 */
    initPage: function () {
      console.log("initPage");
      var that = this;
      that.loadUserPayRecordsHandler();
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.conditonModel.pageSize=size;
      this.loadUserPayRecordsHandler();
    },
    handleCurrentChange(pageNo) {
      console.log(`当前页: ${pageNo}`);
      this.conditonModel.pageNumber=pageNo;
      this.loadUserPayRecordsHandler();
    },
    timeRangChangeHandler:function(obj){
        console.log("timeRangChangeHandler...");
        debugger
        this.conditonModel.beginTime= this.dateRange[0].Format("yyyy-MM-dd HH:mm:ss");
        this.conditonModel.endTime= this.dateRange[1].Format("yyyy-MM-dd HH:mm:ss");
    },
    /*加载充值记录*/
    loadUserPayRecordsHandler: function () {
      console.log("loadUserPayRecordsHandler...");
      var that = this;

      
     

      //发起http请求
      var url = config.basePath + "/paymentOrder/loadUserPayRecordsHandler";
      var paras = this.conditonModel;
      if(appCore.isNullOrUndefined(paras.beginTime)||appCore.isNullOrUndefined(paras.endTime)){
        this.conditonModel.beginTime= new Date().addMonths(-3).Format("yyyy-MM-dd HH:mm:ss");
        this.conditonModel.endTime= new Date().getTodayEnd();
      }
      //appCore.MessageBox.loading();
      httpClient.post(url, paras).then(function (response) {

        //appCore.MessageBox.closeLoading();
        if (!response || response.IsSuccess === false) {
          console.log("加载充值记录数据出现故障！请刷新页面！");
          return;
        }
        //debugger
        that.orderList = response.Data; //返回的响应数据
        that.conditonModel.total=response.PagerInfomation.TotalElements;


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
