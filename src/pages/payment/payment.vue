<!--viwe 用来组建元素-->
<template>
  <div>
   
    <!--用户选择购买服务-->
    <div id="contentMain" class="content">
      <div class="head">
        <div class="logo"></div>
        <div class="con">
          <p class="title">快鸟YoYo</p>
          <p class="details">
              【快鸟YoYo】是为电商卖家信息管理的开发模板！</p>
          <p class="price">
            价格：
            <span id="prices">{{orderModel.Price}}</span>元
          </p>
          
          <p class="version">
            版本：
            <a href="javascript:;">全功能版</a>
          </p>
          <p class="btns" id="btns">
            周期：

            <a v-for="item in serviceItems" :key="item.Value" @click="selectServiceTimeHandler(item.Value)"  href="javascript:;" :class="item.Selected">{{item.Name}}</a>
            
          </p>
          <button id="genOrderBtn" @click="gotoBuyHandler" type="button" class="btn" >立即购买</button>
        </div>
      </div>
      <div class="clearfix">
        <div class="left">
          <div class="title">简介</div>
          <div class="info">快鸟YoYo</div>
          <div class="desc">
            <p class="contact">
              <label>客服电话：</label>0592-88888888
              <br>
              <label>客服邮箱：</label>fuwu@qianbaihe.com
            </p>
            <p style="color: #666;">
              快鸟YoYo为一家知名互联网服务企业，XXXXX软件50项功能覆盖卖家日常运营的各个环节，旨在帮助掌柜增加销量、节省人力，真正实现轻松开店。
              客服24小时竭诚为您服务，如遇紧急情况，请拨打电话：6666666666666。
            </p>
          </div>
        </div>
        <div class="right">
          <table width="750" border="0" cellpadding="0" cellspacing="0">
             <!--内容详情-->
           
          </table>
        </div>
      </div>
    </div>
    <div id="contentOrder" class="content" style="display:none;" >
      <h3 class="order-title">服务续费</h3>
      <table class="order-list">
        <tr>
          <th>订购店铺</th>
          <th>服务名称</th>
          <th>订购周期</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>实付(元)</th>
        </tr>
        <tr>
          <td id="L_ShopNick">{{orderModel.ShopName}}</td>
          <td>{{orderModel.ProductName}}</td>
          <td id="L_Month">{{orderModel.CycleDescption}}</td>
          <td id="L_Start">{{orderModel.BeginTime}}</td>
          <td id="L_End">{{orderModel.EndTime}}</td>
          <td id="L_Payment">{{orderModel.Price}}</td>
        </tr>
      </table>
      <div class="order-total">
        <img src="/static/images/alipay.png" alt="支付宝"> 支付宝支付
        <span class="total-price">实付款:
          <em id="totalPrice">{{orderModel.Price}}元</em>
        </span>
      </div>
      <form class="order-btn">
        <button id="payBtn" @click="submitOrderHandler" type="button" class="btn" >立即支付</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import "./payment.css";
</style>
<!--依赖的控制器js-->
<script src="./payment.js"></script>
 